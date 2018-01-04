import * as React from "react";
import { Image } from "./Image"
import {GridTile} from "material-ui/GridList"

export interface UploadedImageProps {
    image: Image;
}

export class UploadedImage extends React.Component {

    props: UploadedImageProps;

    constructor(props: UploadedImageProps) {
        super(props);
    }

    render() {
        return (
            <GridTile
              title={this.props.image.description}
              subtitle={this.props.image.owner} >
            <img src={this.props.image.data} />
            </GridTile>
        )
    }
}