var express = require("express");
var cors = require("cors");
const upload = require("express-fileupload");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(upload());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
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
