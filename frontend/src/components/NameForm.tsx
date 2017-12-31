import * as React from "react";
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import Grid from 'material-ui/GridList';
import { FormEvent } from "react";

interface NameState {
    name: string;
}
export interface NameFormProps {
    onSubmit(name: string):void
}
export class NameForm extends React.Component {

    state: NameState = { name: "" };
    props: NameFormProps;
   
    constructor(props: NameFormProps) {
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
            <RaisedButton label="Greet" />
            </div>    
        </form>);
    }
}