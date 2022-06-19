const http = require("http");
const { readFile } = require("fs").promises; //Lets you read the local files
const path = require("path"); //Allows you to control the paths of the files
const request= require("./requests"); //Allows you to make requests to the API

const axios = require("axios"); //Allows you to make requests to other servers



//The server is listening on port 8081
const port = 8081;

class State {
  constructor() {
    this.data = {};
  }
  add(obj) {
    this.data[obj[0]] = [companyName, iexOpen, iexCurrent];
    console.log(obj, "THIS THE OBJECT CLASS");
  }
}

const server = http.createServer(async (req, res) => {
  const ext = path.extname(req.url); //Extracts the extension of the file (.jpg, .png, .css, etc)
  let content; //creates variable to be sent back to the client
  let input;

  if (path.basename(req.url)[0] === "?") {
    input = path.basename(req.url).split("=")[1]; //Extracts the input from the url
  }

  // console.log(input, 'THIS IS THE REQUEST METHOD')
  // console.log(path.basename(req.url), 'THIS IS THE REQUEST url')

  if (req.method === "GET" && path.basename(req.url)[0] === "?") {
    //If the request is a GET request, do something

    const dataArr = [];
    request(input);
    console.log(request.value, "THIS IS THE REQUEST funcccc");



    // const state = new State();

    // state.add(dataArr[axRes.data.symbol] = [companyName, iexOpen, iexCurrent]);

    // console.log(dataArr, 'DATA ARRAYYY')

    content = await readFile("../../frontend/stock_tracker.html");

    res.setHeader("Content-Type", "text/html"); // ALWAYS SEND THE HEADER
  } else if (ext === ".css") {
    //If the file is a css file

    content = await readFile("../../frontend/css/style.css"); //Reads the style.css file
    res.setHeader("Content-Type", "text/css"); //Sets the content type to css
  } else {
    //Reads the html file
    content = await readFile("../../frontend/stock_tracker.html");

    //Sets the content type to html
    res.setHeader("Content-Type", "text/html");
  }

  res.statusCode = 200;

  res.end(content);
});

//Activates the server and listens for requests
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
