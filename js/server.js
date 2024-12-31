const dep = {
  fs: require("fs"),
  http: require("http"),
  ejs: require("ejs"),
};
const port = process.env.PORT || 3001;
const server = dep.http.createServer(function (req, res) {
  let header;
  dep.fs.readFile("index.ejs", { encoding: "utf8" }, (data) => {
    header = {
      type: "text/html",
      body: dep.ejs.render(data, {}),
    };
    res.writeHeader(200, { "Content-Type": header.type });
    res.write(header.body);
    res.end();
  });
});
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
