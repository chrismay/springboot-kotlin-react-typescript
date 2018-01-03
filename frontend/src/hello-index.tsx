import * as React from "react";
import * as ReactDOM from "react-dom";

import { HelloApp } from "./components/HelloApp";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function onSubmit(name: string) {
    console.log("updating: " + name)
}

ReactDOM.render(
    <MuiThemeProvider>
        <HelloApp />
    </MuiThemeProvider>,
    document.getElementById("example")
);
