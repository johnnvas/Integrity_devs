const http = require('http');
const { readFile } = require('fs').promises; //Lets you read the local files
const path = require('path'); //Allows you to control the paths of the files

//The server is listening on port 8081
const port  = 8081;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('I have stuff');
});


//Activates the server and listens for requests
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
