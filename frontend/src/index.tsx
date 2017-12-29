import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { GreetingService, Greeting } from "./components/greetings";

new GreetingService().greet().then(greeting => {
    ReactDOM.render(
        <Hello greet={greeting} />,
        document.getElementById("example")
    )
});