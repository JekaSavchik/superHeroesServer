const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const superheroRouter = require("./routers/superheroRouter.js");
const multer = require("multer");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const favicon = require("serve-favicon");
const path = require('path');

const app = express();

app.engine("hbs", expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs"
}));

app.set("view engine", "hbs");
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

hbs.registerPartials(__dirname + "/views/partials");
app.use(bodyParser.urlencoded({
    extended: false
}));

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    storage: storageConfig,
    fileFilter: fileFilter
}).array("filedata"));

app.use("/", superheroRouter);

app.use(function (request, response, next) {
    response.status(404).send("Not Found")
});

mongoose.connect("mongodb://localhost:27017/heroesdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(3000, function () {
        console.log("Start server!!!");
    });
});
