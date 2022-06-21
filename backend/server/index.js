const http = require("http");
const https = require("https");
const fs = require("fs");
const { readFile } = require("fs").promises; //Lets you read the local files
const path = require("path"); //Allows you to control the paths of the files
const bigRequest = require("./requests"); //Allows you to make requests to the API
const fetch = require("node-fetch"); //Allows you to make requests to the API
// const stock_info = document.getElementById("stock_info"); //Allows you to get the stock info

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
    const logo = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/logo?token=Tpk_1910a3d3a22949f3a4028f154d4dba16`
    );
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/quote?token=Tpk_1910a3d3a22949f3a4028f154d4dba16`
    );
    const body = await response.json();
    const logoBody = await logo.json();
    const companyName = body.companyName;
    const prev = body.iexLastUpdated;
    const current = body.iexRealtimePrice;
    const symbol = body.symbol;
    // const lastestPrice = body.latestPrice;
    console.log(
      body,
      "THIS IS THE FETCH DATAAAA"
    );

    // const state = new State();

    // state.add(dataArr[axRes.data.symbol] = [companyName, iexOpen, iexCurrent]);

    // console.log(dataArr, 'DATA ARRAYYY')

    // content = await readFile("../../frontend/stock_tracker.html");

    // if (current > prev) {
    //   const arrow = "&#x25BC;";
    //   const color = "red";
    // } else if (current < prev) {
    //   const arrow = "&#x25B2;";
    //   const color = "green";
    // }

    const arrow = "&#x25B2;";

    // <link rel="stylesheet" type="text/css" href="../public/css/style.css" />
    //  <div class="container">
    //      <img src=${logoBody.url} alt="logo" width="100" height="100">
    //      <div class='result'><span id='span'>${companyName}</span>|<span id='span' style="color:green">${current}${arrow}</span>|<a href="/"><button class='backbtn'>Back</button></a</div>
    //  </div>
    content = `
    <!DOCTYPE html>
     <html lang="en">
     <head>
     <meta charset="UTF-8" />
     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Integrity Stock</title>
     <link rel="stylesheet" type="text/css" href="../public/css/style.css" />
     <script src="../backend/server/index.js"></script>
     </head>
     <body>
     <h1 class="header">Integrity Stock: </h1>
     <form action="/" method="get" class="input">
     <input name="stock_symbol" id="search" placeholder="Stock Symbol" />
     <button id="input_submit">Agregar</button>
     </form>
     <div class="container">
         <img src=${logoBody.url} alt="logo" width="80" height="80">
         <div class='result'><span id='span'>${companyName}</span>|<span id='span' style="color:green">${current}${arrow}</span>|<a href="/"><button class='backbtn'>Delete</button></a</div>
     </div>
  </body>
</html>


          `;
    res.setHeader("Content-Type", "text/css");
    res.setHeader('Content-Type', 'image/png');
    res.setHeader("Content-Type", "text/html"); // ALWAYS SEND THE HEADER
    // res.setHeader('Content-Type', 'image/jpeg'); // ALWAYS SEND THE HEADER
  } else if (ext === ".css") {
    //If the file is a css file

    content = await readFile("../../frontend/css/style.css"); //Reads the style.css file
    res.setHeader("Content-Type", "text/css"); //Sets the content type to css
  }
  else {
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
