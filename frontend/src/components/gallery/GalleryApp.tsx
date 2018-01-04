import * as React from "react";
import { UploadImageForm } from "./UploadImageForm";
import { Image } from "./Image";
import { UploadedImages } from "./UploadedImages";

interface GalleryProps { }
interface GalleryState {
    images: Image[];
}

export class GalleryApp extends React.Component {

    state: GalleryState;

    constructor(props: GalleryProps) {
        super(props);
        this.state = { images: [] }
    }

    async componentDidMount() {
        const imgs = await this.loadImages();
        this.setState({ images: imgs });
    }

    loadImages(): Promise<Image[]> {
        return fetch("http://localhost:8080/api/image")
            .then(r => r.json())
    }

    submitPhoto = (image: Image) => {
        fetch("http://localhost:8080/api/image/",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(image)
            });
    }
    render() {
        return (<div>
            <UploadedImages images={this.state.images}/>
            <UploadImageForm onSubmit={this.submitPhoto} />
        </div>)
    }
}