var greeter = require('./greeter');
var moment = require('moment');

var greeting = greeter.greet();

if (typeof document !== 'undefined') {
  var apiEndpoint = 'http://localhost:8080/api/hello';
  var el = document.createElement('h1');

  fetch(apiEndpoint + '/webpack').then(function(response) { 
    return response.json();
  }).then(function(obj) {
    el.innerHTML = greeting + '<br>' + obj.content + '<br>At ' + moment.utc(obj.time).format('MMMM Do YYYY, h:mm:ss a');
    document.body.appendChild(el);
  }).catch(function(err) {
    console.error(err)  
    el.innerHTML = 'oh no…';
    document.body.appendChild(el);
  });
} else {
  console.log(greeting);
}