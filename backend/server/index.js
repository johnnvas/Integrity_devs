const http = require("http");
const https = require("https");
const { readFile } = require("fs").promises; //Lets you read the local files
const path = require("path"); //Allows you to control the paths of the files
const bigRequest = require("./requests"); //Allows you to make requests to the API

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



http.createServer(async (req, res) => {
  const ext = path.extname(req.url); //Extracts the extension of the file (.jpg, .png, .css, etc)
  let content; //creates variable to be sent back to the client
  let input;

  if (path.basename(req.url)[0] === "?") {
    input = path.basename(req.url).split("=")[1]; //Extracts the input from the url
  }
  const url = `https://sandbox.iexapis.com/stable/stock/${input}/quote?token=Tpk_1910a3d3a22949f3a4028f154d4dba16`



    // const state = new State();

    // state.add(dataArr[axRes.data.symbol] = [companyName, iexOpen, iexCurrent]);

    // console.log(dataArr, 'DATA ARRAYYY')

    content = await readFile("../../frontend/stock_tracker.html");

  res.setHeader("Content-Type", "text/html");

  res.statusCode = 200;

  res.end(content);
}).listen(port, () => {
  console.log(`Server running on ${port}`);
});
