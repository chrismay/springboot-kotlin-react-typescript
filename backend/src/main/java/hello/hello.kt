package hello

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.time.ZonedDateTime

@RestController
class HelloController {

    @GetMapping("/helloworld")
    fun helloWorld(): String {
        return "Hello Docker World"
    }

    @GetMapping("api/hello")
    fun helloNoName(): Greeting {
        return Greeting("Hello, World", ZonedDateTime.now())
    }

    @GetMapping("api/hello/{name}")
    fun helloName(@PathVariable name: String): Greeting {
        return Greeting("Hello, " + name, ZonedDateTime.now())
    }

    data class Greeting(val content: String, val time: ZonedDateTime)
}