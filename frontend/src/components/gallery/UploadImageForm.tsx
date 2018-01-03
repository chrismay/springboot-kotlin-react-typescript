import * as React from "react";
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { FormEvent } from "react";

interface UploadFormState {
    name: string;
}
export interface UploadFormProps {
    onSubmit(name: string):void
}
export class UploadImageForm extends React.Component {

    state: UploadFormState = { name: "" };
    props: UploadFormProps;
   
    constructor(props: UploadFormProps) {
        super(props);
    }

    handleNameChange = (event: React.FormEvent<HTMLInputElement>, newValue: string) =>
        this.setState({ name: event.currentTarget.value });

    handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();    
        this.props.onSubmit(this.state.name);
    }
    

    render() {
        return (<form onSubmit = {this.handleSubmit}>
            <div>
            <TextField
                id="name"
                floatingLabelText="name"
                floatingLabelFixed
                value={this.state.name}
                onChange={this.handleNameChange}
            />
            </div>
            <div>
            <RaisedButton label="Upload" />
            </div>    
        </form>);
    }
}