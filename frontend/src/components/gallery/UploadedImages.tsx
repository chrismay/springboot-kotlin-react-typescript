import * as React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Image } from './Image';
import { UploadedImage } from './UploadedImage';
import { GridList } from 'material-ui/GridList';

export interface ImagesProps {
    images: Image[]
}
export class UploadedImages extends React.Component {

    props: ImagesProps;

    constructor(props: ImagesProps) {
        super(props);
    }
    render() {
        return (<GridList>
            {
                this.props.images.map(img => <UploadedImage key={img.id} image={img} />)
            }
        </GridList>)
    }
}