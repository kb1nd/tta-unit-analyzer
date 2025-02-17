const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
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
app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.get("/playground", (req, res) =>
  res.sendFile(__dirname + "/views/playground.html"),
);
app.get("/docker", (req, res) =>
  res.sendFile(__dirname + "/views/docker.html"),
);
app.get("/calculator", (req, res) =>
  res.sendFile(__dirname + "/views/calculator.html"),
);
app.ws("/", (ws, req) => {
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
              Cache[
                Cache.indexOf(Cache.find((stream) => stream.key === data.key))
              ].data,
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
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
