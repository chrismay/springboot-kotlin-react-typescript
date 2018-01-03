import * as React from "react";
import * as ReactDOM from "react-dom";

import { GalleryApp } from "./components/gallery/GalleryApp";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <GalleryApp/>
    </MuiThemeProvider>,
    document.getElementById("gallery")
);
