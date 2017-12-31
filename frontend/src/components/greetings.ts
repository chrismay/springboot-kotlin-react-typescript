
export type GreetingProvider = (name: string) => Promise<Greeting>;
export const fetchGreeting: GreetingProvider = name => fetch('http://localhost:8080/api/hello/' + name).then(r => r.json());

export interface Greeting {
    content: String,
    time: number
}