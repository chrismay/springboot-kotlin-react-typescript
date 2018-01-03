import * as React from "react";
import { Greeting, fetchGreeting } from "./greetings";
import { NameForm } from "./NameForm";
import { HelloBanner } from "./HelloBanner";

interface AppProps { }
interface AppState { greeting?: Greeting; }

export class HelloApp extends React.Component {

    state: AppState;

    constructor(props: AppProps) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        const g = await fetchGreeting("webpack");
        this.updateGreeting(g);
    }

    updateGreeting = (greeting: Greeting) => {
        this.setState({ "greeting": greeting })
    }

    onSubmit = (name: string) => {
        fetchGreeting(name).then(this.updateGreeting);
    }

    render() {
        if (this.state.greeting == null) {
            return (<div>
                <span> ...loading... </span>
                <NameForm onSubmit={this.onSubmit} />
            </div>)
        } else {
            return (<div>
                <HelloBanner greeting={this.state.greeting} />
                <NameForm onSubmit={this.onSubmit} />
            </div>)
        }
    }
}