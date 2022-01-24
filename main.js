// const http = require("http");
// const fs = require("fs");

// const server = http.createServer(function (req, res) {
//   fs.readFile("./www/index.html", "utf-8", function (err, data) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(data);
//     res.end();
//   });
// });
// server.listen(8000);
// console.log("サーバを起動しました");

var http = require("http");
var fs = require("fs");
var server = http
  .createServer(function (req, res) {
    var contentType = "text/html";
    var content = "";
    var status = 200;
    var uri = req.url;
    var documentRoot = __dirname + "/www";

    var last = uri.substring(uri.length - 1, 1);
    if (last == "/") {
      uri = uri + "index.html";
    }

    // TODO: ../ などを指定された時に上位のディレクトリのファイルが読まれてしまわないようにしておくべき。
    var uriary = uri.split(".");
    if (uriary.length >= 2) {
      try {
        kind = uriary[uriary.length - 1];
        if (kind == "html" || kind == "htm") {
          contentType = "text/html";
        } else if (kind == "css") {
          contentType = "text/css";
        } else if (kind == "js") {
          contentType = "text/html";
        }

        content = fs.readFileSync(documentRoot + uri);
      } catch (e) {
        status = 404;
        content = "content not found!" + documentRoot;
      }
    } else {
    }
    res.writeHead(status, { "Content-Type": contentType });
    res.end(content, "utf-8");
  })
  .listen(8000); // ポート競合の場合は値を変更
console.log("サーバを起動しました");
