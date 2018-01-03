package demoapp.gallery

import junit.framework.Assert.assertEquals
import junit.framework.Assert.assertNotNull
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ImageApiTests {

    @Autowired
    lateinit var testRestTemplate: TestRestTemplate

    @Test
    fun shouldReturn404ForMissingImage() {
        val result = testRestTemplate.getForEntity("/api/image/0", String::class.java)
        assertNotNull(result)
        assertEquals(HttpStatus.NOT_FOUND, result.statusCode)
    }

    @Test
    fun canCreateAnImage(){
        val creation = CreateImage("foo")
        val postResponse = testRestTemplate.postForEntity("/api/image/", creation, ImageView::class.java)
        assertNotNull(postResponse.body)
        val getResponse = testRestTemplate.getForEntity("/api/image/" + postResponse.body.id, ImageView::class.java)
        val fetched = getResponse.body
        assertEquals(fetched, postResponse.body)
        assertEquals("foo", fetched.description)
        assertNotNull(fetched.createdDate)
    }

    @Test
    fun canUpdateAnImage(){
        val creation = CreateImage("foo")
        val postResponse = testRestTemplate.postForEntity("/api/image/", creation, ImageView::class.java)
        assertNotNull(postResponse.body)

        val update = UpdateImage("bar")
        testRestTemplate.put("/api/image/" + postResponse.body.id,  update, ImageView::class.java)

        val getResponse = testRestTemplate.getForEntity("/api/image/" + postResponse.body.id, ImageView::class.java)
        val fetched = getResponse.body
        assertEquals("bar", fetched.description)
        assertEquals(fetched.createdDate, postResponse.body.createdDate)
    }
}