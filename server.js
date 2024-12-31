const dep = {
  fs: import("fs"),
  http: import("http"),
  ejs: import("ejs"),
};
const port = process.env.PORT || 3001;
async function handle(req, res) {
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
}
const server = dep.http.createServer((req, res) => {
  handle(req, res);
});
server.listen(port);
