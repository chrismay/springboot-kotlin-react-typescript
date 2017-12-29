export class GreetingService {

    greet(): Promise<Greeting>{
        const apiEndpoint = 'http://localhost:8080/api/hello';
        return  fetch(apiEndpoint + '/webpack').then(function(response) { 
            return response.json();
        });
    }
}

export interface Greeting {
    content:String,
    time:number
}