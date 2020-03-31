const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRouter.js");
const superheroRouter = require("./routers/superheroRouter.js");
const multer  = require("multer");

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({extended: false}));

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

app.use(express.static(__dirname + "/public"));
app.use(multer({storage:storageConfig}).single("filedata"));

app.use("/superheroes", superheroRouter);
app.use("/", homeRouter);
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
 
app.use(function (request, response, next) {
    response.status(404).send("Not Found")
});
 
mongoose.connect("mongodb://localhost:27017/superheroesdb", {useNewUrlParser: true}, function(err){
    if(err){
        return console.log(err);
    }
    app.listen(3000, function(){
        console.log("Start server!!!");
    });
    // const superhero = new Superhero({
    //     nickName: "Spider-Man",
    //     realName: "Piter Parker",
    //     originDescription: "an unusual spider bit him",
    //     superpowers: "​Spider-Man received superpower, increased dexterity, “spider instinct”, as well as the ability to stay on steep surfaces and release cobwebs from his hands using a device of his own invention",
    //     catchPhrase: "Friendly neighbor spiderman",
    //     images: ["./public/images/spider_man.jpg", "/public/images/231px-AmazingSpiderMan50.jpg"]
    // });

    // superhero.save(function(err){
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log(superhero);
    // });
});



// const Schema = mongoose.Schema;

// const jsonParser = express.json();
// const mongoose = require("mongoose");
// const superheroScheme = new Schema({
//     nickName: {
//         type: String,
//         required: true,
//         minlength: 1
//     },
//     realName:{
//         type: String,
//         default: "Unknown"
//     },
//     originDescription: {
//         type: String,
//         default: "Non description"
//     },
//     superpowers: {
//         type: String,
//         default: "Unknown"
//     },
//     catchPhrase: {
//         type: String,
//         default: "Non"
//     },
//     images: [String]
// });

// const Superhero =  mongoose.model("Superhero", superheroScheme);

// app.use(express.static(__dirname + "/public"));

// mongoose.connect("mongodb://localhost:27017/superheroesdb", {useNewUrlParser: true}, function(err){
//     if(err){
//         return console.log(err);
//     }
//     app.listen(3000, function(){
//         console.log("Start server!!!");
//     });
//     // const superhero = new Superhero({
//     //     nickName: "Spider-Man",
//     //     realName: "Piter Parker",
//     //     originDescription: "an unusual spider bit him",
//     //     superpowers: "​Spider-Man received superpower, increased dexterity, “spider instinct”, as well as the ability to stay on steep surfaces and release cobwebs from his hands using a device of his own invention",
//     //     catchPhrase: "Friendly neighbor spiderman",
//     //     images: ["./public/images/spider_man.jpg", "/public/images/231px-AmazingSpiderMan50.jpg"]
//     // });

//     // superhero.save(function(err){
//     //     if(err){
//     //         return console.log(err);
//     //     }
//     //     console.log(superhero);
//     // });
// });

// app.get("/api/superheroes", function(request, response){
//     Superhero.find({}, function(err, superheroes){
//         if(err){
//             return console.log(err);
//         }
//         response.send(superheroes);
//     });
// });

// app.get("/api/superheroes:id", function(request, response){
//     const id = request.params.id;
//     Superhero.findOne({_id: id}, function(err, superhero){
//         if(err){
//             return console.log(err);
//         }
//         response.send(superhero);
//     });
// });

// app.post("/api/superheroes", jsonParser, function(request, response){
   
//     if(!request.body){
//         return response.sendStatus(400);
//     }

//     const heroNicName = request.body.nickName;
//     const heroRealName = request.body.realName;
//     const heroDescription = request.body.originDescription;
//     const heroSuperPower = request.body.superpowers;
//     const heroCatchPhrase = request.body.catchPhrase;
//     const heroImages = request.body.images;

//     const superhero = new Superhero({
//         nickName: heroNicName,
//         realName: heroRealName,
//         originDescription: heroDescription,
//         superpowers: heroSuperPower,
//         catchPhrase: heroCatchPhrase,
//         images: heroImages
//     });

//     superhero.save(function(err){
//         if(err){
//             return console.log(err);
//         }
//         response.send(superhero);
//     });
// });

// app.delete("/api/superheroes/:id", function(request,response){

//     const id = request.params.id;
//     Superhero.findByIdAndDelete(id, function(err, superhero){

//         if(err){
//             return console.log(err);
//         }
//         response.send(superhero);
//     });
// });

// app.put("/api/superheroes", jsonParser, function(request, response){
    
//     if(!request.body){
//         return response.sendStatus(400);
//     }

//     const id = request.body.id;
//     const heroNicName = request.body.nickName;
//     const heroRealName = request.body.realName;
//     const heroDescription = request.body.originDescription;
//     const heroSuperPower = request.body.superpowers;
//     const heroCatchPhrase = request.body.catchPhrase;
//     const heroImages = request.body.images;

//     const superhero = new Superhero({
//         nickName: heroNicName,
//         realName: heroRealName,
//         originDescription: heroDescription,
//         superpowers: heroSuperPower,
//         catchPhrase: heroCatchPhrase,
//         images: heroImages
//     });

//     Superhero.findOneAndUpdate({_id: id}, superhero, {new: true}, function(err, superhero){
//         if(err){
//             return console.log(err);
//         }
//         response.send(superhero);
//     });
// });
