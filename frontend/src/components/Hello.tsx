import * as React from "react";
import { Greeting } from "./greetings";
import * as moment from "moment";

export interface HelloProps { greet: Greeting; }

export const Hello = (props: HelloProps) => <h1>{props.greet.content}, it is {dateToString(props)}! </h1>;

function dateToString(props: HelloProps): String {
    return moment(epoch(props)).format('MMMM Do YYYY, h:mm:ss a')
}

function epoch(props: HelloProps): number {
    return props.greet.time * 1000;
}