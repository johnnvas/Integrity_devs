const request = (input) => {
  const https = require('https');
  let value;
  let companyObj ;


  https.get(`https://sandbox.iexapis.com/stable/stock/${input}/quote?token=Tpk_1910a3d3a22949f3a4028f154d4dba16`, res => {
    let data = [];

  res.on('data', chunk => {
    data.push(chunk);
  });


  res.on('end', () => {
    const company = JSON.parse(Buffer.concat(data).toString());
    value = company
    console.log('Response ended: ');
    let companyName = company.companyName;
    let iexPrev = company.iexLastUpdated;
    let iexCurrent = company.iexRealtimePrice;
    let symbol = company.symbol;
      console.log(companyName, iexPrev, iexCurrent, symbol, 'DATAAAAAAA')

    companyObj = {
       companyName: companyName,
       iexPrev: iexPrev,
       iexCurrent: iexCurrent,
       symbol: symbol
     }
     console.log(companyObj, 'THIS IS THE DATAarratt');
     console.log(data, 'THIS IS THE DATAarratt');
  });

});
}

module.exports = request;
