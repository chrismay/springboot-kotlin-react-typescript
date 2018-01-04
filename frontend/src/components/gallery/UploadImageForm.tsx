import * as React from "react";
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { UploadPreview } from './UploadPreview';
import { FormEvent } from "react";
import {Image} from "./Image"

export interface UploadFormState {
    name: string;
    desc: string;
    picture?: string;
}

export interface UploadFormProps {
    onSubmit(image:Image): void
}

export class UploadImageForm extends React.Component {

    state: UploadFormState = { name: "", desc: ""};
    props: UploadFormProps;

    constructor(props: UploadFormProps) {
        super(props);
    }

    handleDescChange = (event: React.FormEvent<HTMLInputElement>, newValue: string) =>
        this.mergeState({ desc: newValue });

    handleNameChange = (event: React.FormEvent<HTMLInputElement>, newValue: string) =>
        this.mergeState({ name: newValue });

    handleFileUpload = (data:string ) =>{
            this.mergeState({picture: data});    
    }
        
    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSubmit({
            owner: this.state.name,
            description: this.state.desc,
            data: this.state.picture || ""
        });
    }

    private mergeState = (newState:({picture:string}|{desc:string}|{name:String})) => {
        this.setState(Object.assign({}, this.state, newState));
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <div>
                <TextField
                    id="name"
                    floatingLabelText="your name"
                    floatingLabelFixed
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
            </div>
            <div>
                <TextField
                    id="description"
                    floatingLabelText="description"
                    floatingLabelFixed
                    value={this.state.desc}
                    onChange={this.handleDescChange}
                />
            </div>
            <div>
              <p/>
            </div>
            <UploadPreview onFileDataLoaded = {this.handleFileUpload} />    
            <div>
                <RaisedButton type="submit" label="Upload" />
            </div>
        </form>);
    }
}