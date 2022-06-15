var express = require("express");
var mysql = require("mysql");
var cors = require("cors");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 80;
var db_info = {
  host: process.env.DB_HOST,
  port: "3306",
  user: process.env.DB_USER,
  database: process.env.DB_USER,
  password: process.env.DB_PASS,
};
app.use(express.json());
app.use(
  cors({
    origin: "https://coast-test.netlify.app/",
    credentials: true,
  })
);
app.post("/", (req, res) => {
  var connection = mysql.createConnection(db_info);
  connection.connect();

  if (req.body.data) {
    connection.query(
      `UPDATE testevent SET InputData = "${req.body.data}" `,
      function (err, results, fields) {
        // testQuery 실행
        if (err) {
          console.log(err);
        }
      }
    );
  }

  console.log(req.body.data);
  // res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
