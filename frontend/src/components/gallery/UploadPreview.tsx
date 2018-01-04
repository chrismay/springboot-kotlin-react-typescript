import * as React from "react";

export interface UploadPreviewProps {
    onFileDataLoaded(data:string):void
}

interface UploadPreviewState {
    fileData?: string;
}

export class UploadPreview extends React.Component {

    state: UploadPreviewState = {};
    props: UploadPreviewProps;

    constructor(props: UploadPreviewProps) {
        super(props);
    }

    handleFileUpload = (pictures: React.FormEvent<HTMLInputElement>) => {
        if (pictures.currentTarget.files && pictures.currentTarget.files[0]) {
            const f: File = pictures.currentTarget.files[0];
            const r = new FileReader();
            r.readAsDataURL(f);
            r.onloadend = e => {
                this.setState({ fileData: r.result });
                this.props.onFileDataLoaded(r.result);
            }
        }
    }

    render() {
        return (<div>
            <input type="file" onChange={(e) => this.handleFileUpload(e)} />
            <div>
                <img height="200" src={this.state.fileData} />
            </div>
        </div>
        )
    }
}