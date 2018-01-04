package demoapp.gallery

import org.junit.Assert.*
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ImageApiTests {

    @Autowired
    lateinit var testRestTemplate: TestRestTemplate

    private val API_BASE = "/api/image"

    data class CreateResult(val location: String, val image: ImageView)

    fun <T> ResponseEntity<T>.location(): String = this.headers.get("location")!![0]

    fun TestRestTemplate.create(img: CreateImage): CreateResult {
        val postResponse = this.postForEntity(API_BASE, img, ImageView::class.java)
        assertEquals(HttpStatus.CREATED, postResponse.statusCode)
        return CreateResult(postResponse.location(), postResponse.body)
    }

    @Test
    fun shouldReturn404ForMissingImage() {
        val result = testRestTemplate.getForEntity("${API_BASE}0", String::class.java)
        assertEquals(HttpStatus.NOT_FOUND, result.statusCode)
    }

    @Test
    fun canCreateAnImage() {
        val lotsOfData = "a".repeat(1000000)
        val creation = CreateImage("foo", owner = "baz", data = lotsOfData)
        val (location, created) = testRestTemplate.create(creation)

        assertTrue(location.matches(".*${API_BASE}/${created.id}".toRegex()))

        val fetched = testRestTemplate.getForObject(location, ImageView::class.java)

        assertEquals(fetched, created)
        assertEquals("foo", fetched.description)
        assertNotNull(fetched.createdDate)
    }

    @Test
    fun canUpdateAnImage() {
        val creation = CreateImage("foo", owner = "baz", data = "buzz")

        val (location, created) = testRestTemplate.create(creation)

        assertNotNull(created)

        val update = UpdateImage("bar", "boz")
        testRestTemplate.put(location, update, ImageView::class.java)

        val fetched = testRestTemplate.getForObject(location, ImageView::class.java)
        assertEquals("bar", fetched.description)
        assertEquals("boz", fetched.data)
        assertEquals(fetched.createdDate, created.createdDate)
    }

    @Test
    fun canGetAll() {
        testRestTemplate.create(CreateImage("one", "a", "b"))
        testRestTemplate.create(CreateImage("two", "a", "b"))

        val all = testRestTemplate.getForEntity(API_BASE, Array<ImageView>::class.java)
        assertTrue(all.body.size > 1)
    }
}