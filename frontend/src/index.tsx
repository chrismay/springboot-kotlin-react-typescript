import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function onSubmit(name: string) {
    console.log("updating: " + name)
}

ReactDOM.render(
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>,
    document.getElementById("example")
);
