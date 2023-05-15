const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") res.end("Welcome to our home page");
    if (req.url === "/about") res.end("Here is about");
    res.end(`<h1>Opps no url found</h1>`);
});

server.listen(5000);
