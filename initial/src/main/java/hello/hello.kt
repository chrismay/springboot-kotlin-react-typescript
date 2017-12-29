package hello

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloController {

    @GetMapping("/helloworld")
    fun helloWorld(): String {
        return "Hello Docker World"
    }

    @GetMapping("/hellokotlin")
    fun helloKotlin(): Greeting {
        return Greeting("hello", "kotlin world")
    }

    data class Greeting(val greet:String, val name:String)
}