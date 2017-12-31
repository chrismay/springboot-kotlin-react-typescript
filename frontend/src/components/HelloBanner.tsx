import * as React from "react";
import { Greeting } from "./greetings";
import * as moment from "moment";

export interface HelloBannerProps { greeting: Greeting; }

export class HelloBanner extends React.Component {

    props: HelloBannerProps;

    constructor(props: HelloBannerProps) {
        super(props);
    }

    render() {
        return <h1>{this.props.greeting.content}, it is {dateToString(this.props.greeting.time)}! </h1>;
    }

}

function dateToString(epochSeconds: number): String {
    return moment(epochSeconds * 1000).format('MM Do YY, h:mm:ss a')
}
