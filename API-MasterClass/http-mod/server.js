const http = require("http");

const TODOS = [
    {
        id: 1,
        text: "todo-1",
    },
    {
        id: 2,
        text: "todo-2",
    },
];

const server = http.createServer((req, res) => {
    const { headers, url, method } = req;
    console.log(headers, url, method);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-powered-by", "Node.js");
    res.write(JSON.stringify({ success: true }));
    res.write(JSON.stringify({ data: TODOS }));
    res.end(JSON.stringify({ success: true, data: TODOS }));
    res.end();
});

server.listen(5000, () => {
    console.log("Server up and runninga t port 5000");
});
