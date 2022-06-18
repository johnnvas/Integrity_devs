const http = require('http');
const { readFile } = require('fs').promises; //Lets you read the local files
const path = require('path'); //Allows you to control the paths of the files
const axios = require('axios'); //Allows you to make requests to other servers

//The server is listening on port 8081
const port = 8081;

class State {
  constructor() {
    this.data = {};
  }
  add(obj) {
    this.data[obj[0]] = [companyName, iexOpen, iexCurrent]
    console.log(obj, 'THIS THE OBJECT CLASS')
  }
}

const server = http.createServer(async (req, res) => {

  const ext = path.extname(req.url); //Extracts the extension of the file (.jpg, .png, .css, etc)
  let content; //creates variable to be sent back to the client

  if (req.method === "GET") {

    // const res = await axios.get('https://cloud.iexapis.com/')
    // const res = await axios.get('https://cloud.iexapis.com/v1/stock/AAPL/quote?token=pk_0c0d5f645efc478fae0a127a9b14b729')
    // console.log(res.data, 'DATAAAAAAA')
    // res.setHeader('Content-Type', 'text/css'); //Sets the content type to css

  } else if (req.method === "POST") { //If the request is a POST request, do something


    let formData = ''; //Extracts the data from the form
    for await (let chunk of req) {
      formData += chunk;
    }

    const inputs = formData.split('&')
    .map(input => input.split('=')) //Splits the data into an array of inputs
    .map(([key, value]) => ([key, value.replace(/\+/g, ' ')])) //Maps to fix the spaces and characters
    .map(([key, value]) => ([key, decodeURIComponent(value)])) //Decodes the characters
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {}); //Reduces the array to a single object

       //Reads the html file


       let symbol;

       for (let [key, value] of Object.entries(inputs)) {
         content += `<p>Stock: ${value} <br/></p>`;
         symbol = value
      };

    const axRes = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=Tpk_1910a3d3a22949f3a4028f154d4dba16`)
    const dataArr = {};

    let companyName = axRes.data.companyName;
    let iexOpen = axRes.data.iexOpen;
    let iexCurrent = axRes.data.iexRealtimePrice;

    // console.log(companyName, iexOpen, iexCurrent, 'DATAAAAAAA')

    const state = new State();

    state.add(dataArr[axRes.data.symbol] = [companyName, iexOpen, iexCurrent]);

      // console.log(dataArr, 'DATA ARRAYYY')

    content = await readFile('../../frontend/stock_tracker.html');

    res.setHeader('Content-Type', 'text/html'); // ALWAYS SEND THE HEADER

  } else if (ext === '.css') { //If the file is a css file

    content = await readFile('../../frontend/css/style.css'); //Reads the style.css file
    res.setHeader('Content-Type', 'text/css'); //Sets the content type to css

  } else {
    //Reads the html file
    content = await readFile('../../frontend/stock_tracker.html');

    //Sets the content type to html
    res.setHeader('Content-Type', 'text/html');
  }

  res.statusCode = 200;

  res.end(content);
});


//Activates the server and listens for requests
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
