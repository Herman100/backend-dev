const http = require("http");

const hostname = "127.0.0.1";

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("He is the GOAT");
  } else if (req.url === "/ronaldo") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("He is the just a baller");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 thats not a footballer");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is listening on at http://${hostname}:${port}`);
});
