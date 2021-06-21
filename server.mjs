import express, { request, response } from 'express'; // the easy way to write a server 
import fs from 'fs';

const app = express(); //Creating express app
const messages = [];


const html = fs.readFileSync('index.html', {encoding: "UTF-8"});//Use fs library to read "index.html"
app.get('/', (request, response) => {//When asking for main page
    
    if(request.query.message){//We can access query string parameters with express. the "qury" is an object with all the data of query string
                              //If a message was sent through a query string 
        const messagesStr = fs.readFileSync('messages.json', {encoding: 'UTF-8'});//read 'messages.json' returns a string
        const messages = JSON.parse(messagesStr);//takes the messages string and converts it to an object 

        messages.push({//Push that message to the "messages" array (the message is an object)
            name: request.query.name,
            message: request.query.message,
            date: new Date(),
        });

        fs.writeFileSync('messages.json', JSON.stringify(messages));//Replaces the content of 'messages.json' with 
                                                                   //JSON.stringify - Takes the "messages" object and converts it to a string, 
                                                    
    }
    response.send(html);//return the html page

});

app.get('/messages', (request, response) => {  //When asking for 'messages'
                                                    
    const messages = fs.readFileSync('messages.json', {encoding: "UTF-8"}); //Read 'messages.json' file and return the messages as a string 
    response.json(JSON.parse(messages));//JSON.parse - takes the messages string and converts it to an object 
                                        //json() - returns promise which resolves with a JavaScript object that is the result of parsing the body text as JSON
                                        //Note that despite the method being named json(), the result is not JSON 
                                        //but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
}
);

app.listen(8080); //Port

