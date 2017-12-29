package hello

import org.assertj.core.api.Assertions.assertThat
import org.junit.Assert.*
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KotlinDemoApplicationTests {

    @Autowired
    lateinit var testRestTemplate: TestRestTemplate

    @Test
    fun whenCalled_shouldReturnHello() {
        val result = testRestTemplate.getForEntity("/api/hello", HelloController.Greeting::class.java)

        assertNotNull(result)
        assertEquals(result?.statusCode, HttpStatus.OK)
        if (result?.body is HelloController.Greeting){
            assertEquals(result.body.content, "Hello, World");
        } else{
            fail()
        }
    }

    @Test
    fun whenCalled_withName_shouldReturnHello() {
        val result = testRestTemplate.getForEntity("/api/hello/Chris", HelloController.Greeting::class.java)

        assertNotNull(result)
        assertEquals(result?.statusCode, HttpStatus.OK)
        if (result?.body is HelloController.Greeting){
            assertEquals(result.body.content, "Hello, Chris");
        } else{
            fail()
        }
    }
    @Test
    fun greetingShouldReturnDefaultMessage() {
        assertThat(testRestTemplate.getForObject("/helloworld", String::class.java)).contains("Hello Docker World")
    }
}