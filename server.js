const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const port = process.env.PORT || 3001;
const Cache = [];
const Eval = (key) => {
  return Cache.find((stream) => stream.key === key) ? true : false;
};
const Post = (key, payload) =>
  (Cache[Cache.indexOf(Cache.find((stream) => stream.key === key))] = {
    key: key,
    data: payload,
  });
const Create = (key, payload) =>
  (Cache[Cache.length] = {
    key: key,
    data: payload,
  });
const getRoute = (route) =>
  fs.readFile(__dirname + route).then((html) => {
    return html;
  });
const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  switch (req.url) {
    case "/docker":
      res.end(getRoute("views/docker.html"));
      break;
    case "/playground":
      res.end(getRoute("views/playground.html"));
      break;
    case "/calculator":
      res.end(getRoute("views/calculator.html"));
      break;
    default:
      res.end(getRoute("views/index.html"));
      break;
  }
});
const wss = new WebSocket.Server(server);
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
wss.on("connection", (ws) => {
  ws.on("message", (json) => {
    let data = JSON.parse(json);
    switch (Eval(data.key)) {
      case true:
        switch (data.protocol) {
          case "post":
            Post(data.key, data.payload);
            break;
          case "get":
            ws.send(
              Cache[Cache.indexOf(Cache.find((stream) => stream.key === key))]
                .data,
            );
            break;
        }
        break;
      default:
        if (data.protocol === "establish")
          try {
            Create(data.payload.key, data.payload.stream);
          } catch (error) {
            console.log(error);
            return;
          }
        break;
    }
  });
});
