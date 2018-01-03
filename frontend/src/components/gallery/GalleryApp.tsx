import * as React from "react";
import { UploadImageForm } from "./UploadImageForm";

interface GalleryProps { }
interface GalleryState { }

export class GalleryApp extends React.Component {

    state: GalleryState;

    constructor(props: GalleryProps) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
    }

    render() {
        return (<div>
            <span> ...loading... </span>
            <UploadImageForm onSubmit={name => { }} />
        </div>)
    }
}