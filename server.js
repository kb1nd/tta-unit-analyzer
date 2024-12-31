const dep = {
  fs: require("fs"),
  http: require("http"),
  ejs: require("ejs"),
};
const port = process.env.PORT || 3001;
const server = dep.http.createServer(function (req, res) {
  let header;
  dep.fs.readFileSync("src/index.ejs", { encoding: "utf8" }, (data) => {
    header = {
      type: "text/html",
      body: dep.ejs.render(data, { test: "hello world" }, { async: true }),
    };
    res.writeHeader(200, { "Content-Type": header.type });
    res.write(header.body);
    res.end();
  });
});
server.listen(port);
