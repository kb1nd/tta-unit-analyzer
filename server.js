const dep = { fs: require("fs"), http: require("http"), ejs: require("ejs") };
const port = process.env.PORT || 3001;
const server = dep.http.createServer(function (req, res) {
  dep.ejs.renderFile("view/index.ejs", {}, {}, function (err, str) {
    if (err) {
      console.log("Error when parsing EJS: ", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("Internal Server Error");
      res.end();
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(str);
    res.end();
  });
});
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
