const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  const data = `New recieved request at ${Date.now()}: ${req.url}\n`;

  fs.appendFile("./logger.txt", data, (error, database) => {
    //true further parses myUrl.query
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end(`About Page`);
        break;
      case "/contacts":
        res.end(`Contact Page `);
        break;
      case "/search":
        res.end(`Search ${myUrl.query.search_query} & ${myUrl.query.detail}`);
        break;
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server Initiated");
});
