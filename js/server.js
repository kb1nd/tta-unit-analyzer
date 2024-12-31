const dep = {
  fs: require("fs"),
  http: require("http"),
  ejs: require("ejs"),
};
const port = process.env.PORT || 3001;
const server = dep.http.createServer(function (req, res) {
  let header;
  dep.ejs.renderFile("index.ejs", {}, {}, function (err, str) {
    switch (err) {
      case true:
        console.log("Error when parsing EJS");
    }
    header = {
      type: "text/html",
      body: str,
    };
    res.writeHeader(200, { "Content-Type": header.type });
    res.write(header.body);
    res.end();
  });
});
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
