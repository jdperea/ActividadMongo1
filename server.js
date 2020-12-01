const express=require('express'); 
const bodyParser=require('body-parser'); 
const api = require('./api'); 
const env = require('node-env-file'); // .env file
env(__dirname + '/.env');

const port=process.env.PORT || 4000; 
const app=express(); 

app.listen(port, function() { 
	console.log("Server is listening at port:" + port); 
}); 

// Parses the text as url encoded data 
app.use(bodyParser.urlencoded({extended: true})); 

// Parses the text as json 
app.use(bodyParser.json()); 

app.use('/api', api);
