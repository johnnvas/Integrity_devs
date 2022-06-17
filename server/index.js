const http = require('http');
const { readFile } = require('fs').promises; //Lets you read the local files
const path = require('path'); //Allows you to control the paths of the files

//The server is listening on port 8081
const port  = 8081;

const server = http.createServer(async (req, res) => {
  const ext = path.extname(req.url); //Extracts the extension of the file (.jpg, .png, .css, etc)
  let content = await readFile('stock_tracker.html'); //Reads the index.html file
  let style = await readFile('../public/css/style.css'); //Reads the style.css file
  if (ext === '.css') { //If the file is a css file
    res.setHeader('Content-Type', 'text/css'); //Sets the content type to css
  }
  console.log(ext, 'HEREEE')
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(content);
});


//Activates the server and listens for requests
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
