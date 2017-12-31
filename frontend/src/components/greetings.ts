
export type GreetingProvider = () => Promise<Greeting>;
export const fetchGreeting: GreetingProvider = () => fetch('http://localhost:8080/api/hello/webpack').then(r => r.json());

export interface Greeting {
    content: String,
    time: number
}