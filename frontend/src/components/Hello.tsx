import * as React from "react";
import { Greeting } from "./greetings";
import * as moment from "moment";

export interface HelloProps { fetchGreeting: () => Promise<Greeting>; }
interface HelloState { greeting: Greeting|null; }

export class Hello extends React.Component {

    state: HelloState;
    props: HelloProps;

    constructor(props: HelloProps) {
        super(props);
        this.state = { greeting: null }
    }

    async componentDidMount() {
        const g = await this.props.fetchGreeting();
        this.setState({"greeting":g});
    }
    
    render() {
        if (this.state.greeting == null) {
            return <span />;
        } else {
            return <h1>{this.state.greeting.content}, it is {dateToString(this.state.greeting)}! </h1>
        }
    }
}

function dateToString(greet: Greeting): String {
    return moment(greet.time * 1000).format('MM Do YY, h:mm:ss a')
}
