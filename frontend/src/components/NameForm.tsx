import * as React from "react";
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

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

    handleSubmit = () =>
        this.props.onSubmit(this.state.name);
    

    render() {
        return (<form>
            <TextField
                id="name"
                value={this.state.name}
                onChange={this.handleNameChange}
            />
            <RaisedButton label="Greet" onClick={this.handleSubmit}/>

        </form>);
    }
}