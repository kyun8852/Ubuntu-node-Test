var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
const upload = require("express-fileupload");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;
// var db_info = {
//   host: process.env.DB_HOST,
//   port: "3306",
//   user: process.env.DB_USER,
//   database: process.env.DB_USER,
//   password: process.env.DB_PASS,
// };

app.use(express.json());
app.use(upload());
app.use(
  cors({
    origin: "https://coast-guard-test-app.herokuapp.com",
    credentials: true,
  })
);

// var connection = mysql.createConnection(db_info);
// connection.connect();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    file.mv("./uploads/" + filename, err => {
      if (err) {
        res.send(err);
      } else {
        res.send("fileuplodad");
      }
    });
  }
});

app.post("/data", (req, res) => {
  // if (req.body.data) {
  //   connection.query(
  //     `UPDATE testevent SET InputData = "${req.body.data}" `,
  //     function (err, results, fields) {
  //       // testQuery 실행
  //       if (err) {
  //         console.log(err);
  //       }
  //     }
  //   );
  // }
  if (req.body.data) {
    console.log(req.body.data);
  }
  res.send("OK");
});

app.get("/hello", (req, res) => {
  res.sendFile(__dirname + "/hello_openstack.html");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
