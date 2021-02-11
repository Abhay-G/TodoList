const express = require("express");
const bodyParser = require("body-parser");
const database = require("./src/database/database.js");
const app = express();
app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static("public"));
app.get("/", function (_req, res) {
    const home = require("./src/paths/home.js");
    return home(res);
});

app.get("/:newlist", function (req, res) {
    const custom = require("./src/paths/custom.js");
    return custom(req, res);
});
app.post("/", function (req, res) {
    const homePost = require("./src/paths/post.js");
    homePost(req, res);
});

app.post("/delete", function (req, res) {
    const deletePath = require("./src/paths/delete.js");
    deletePath(req, res);
});

let port = process.env.PORT;
if(port==null || port==""){
    port = 3000;
}
app.listen(port, function (req, res) {
    console.log("Server is running on port 3000");
});
database();
