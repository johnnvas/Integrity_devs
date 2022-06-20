const https = require('https');

const bigRequest = (input) => {
  const request = https.request(`https://sandbox.iexapis.com/stable/stock/${input}/quote?token=Tpk_1910a3d3a22949f3a4028f154d4dba16`, (response) => {
    let data = '';
    let companyObj;
    response.on('data', (chunk) => {
      data += chunk.toString();
    })
    response.on('end', () => {
      const company = JSON.parse(data);
      // companyObj = company
      // console.log(company, 'THIS IS THE COMPANY OBJECT');
      return company;
    })
  })
  request.on('error', (error) => {
    console.log(error);
  })
  // console.log(companyObj, 'THIS IS THE RETURRRRNNNNNNNN');
  request.end();
}
  module.exports = bigRequest;
