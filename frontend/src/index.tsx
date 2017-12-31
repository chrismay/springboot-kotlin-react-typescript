import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { fetchGreeting } from "./components/greetings";

ReactDOM.render(
    <Hello fetchGreeting={fetchGreeting} />,
    document.getElementById("example")
);
