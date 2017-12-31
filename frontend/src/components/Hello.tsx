import * as React from "react";
import { Greeting, GreetingProvider } from "./greetings";
import * as moment from "moment";


export interface HelloProps { fetchGreeting: GreetingProvider; }

interface HelloState { greeting?: Greeting; }

export class Hello extends React.Component {

    state: HelloState;
    props: HelloProps;

    constructor(props: HelloProps) {
        super(props);
        this.state = { }
    }

    async componentDidMount() {
        const g = await this.props.fetchGreeting();
        this.setState({"greeting":g});
    }
    
    render() {
        if (this.state.greeting == null) {
            return <span className="loading-spinner" />;
        } else {
            return <h1>{this.state.greeting.content}, it is {dateToString(this.state.greeting.time)}! </h1>
        }
    }
}

function dateToString(epochSeconds: number): String {
    return moment(epochSeconds * 1000).format('MM Do YY, h:mm:ss a')
}
