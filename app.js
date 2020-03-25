const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const superheroScheme = new Schema({
    nickName: {
        type: String,
        required: true,
        minlength: 1
    },
    realName:{
        type: String,
        default: "Unknown"
    },
    originDescription: {
        type: String,
        default: "Non description"
    },
    superpowers: {
        type: String,
        default: "Unknown"
    },
    catchPhrase: {
        type: String,
        default: "Non"
    },
    images: [String]
});

const Superhero =  mongoose.model("Superhero", superheroScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/superheroesdb", {useNewUrlParser: true}, function(err){
    if(err){
        return console.log(err);
    }
    app.listen(3000, function(){
        console.log("Start server!!!");
    });
});

app.get("/api/superheroes", function(request, response){
    Superhero.find({}, function(err, superheroes){
        if(err){
            return console.log(err);
        }
        response.send(superheroes);
    });
});

app.get("/api/superheroes:id", function(request, response){
    const id = request.params.id;
    Superhero.findOne({_id: id}, function(err, superhero){
        if(err){
            return console.log(err);
        }
        response.send(superhero);
    });
});

app.post("/api/superheroes", jsonParser, function(request, response){
   
    if(!request.body){
        return response.sendStatus(400);
    }

    const heroNicName = request.body.nickName;
    const heroRealName = request.body.realName;
    const heroDescription = request.body.originDescription;
    const heroSuperPower = request.body.superpowers;
    const heroCatchPhrase = request.body.catchPhrase;
    const heroImages = request.body.images;

    const superhero = new Superhero({
        nickName: heroNicName,
        realName: heroRealName,
        originDescription: heroDescription,
        superpowers: heroSuperPower,
        catchPhrase: heroCatchPhrase,
        images: heroImages
    });

    superhero.save(function(err){
        if(err){
            return console.log(err);
        }
        response.send(superhero);
    });
});

app.delete("/api/superheroes/:id", function(request,response){

    const id = request.params.id;
    Superhero.findByIdAndDelete(id, function(err, superhero){

        if(err){
            return console.log(err);
        }
        response.send(superhero);
    });
});

app.put("/api/superheroes", jsonParser, function(request, response){
    
    if(!request.body){
        return response.sendStatus(400);
    }

    const id = request.body.id;
    const heroNicName = request.body.nickName;
    const heroRealName = request.body.realName;
    const heroDescription = request.body.originDescription;
    const heroSuperPower = request.body.superpowers;
    const heroCatchPhrase = request.body.catchPhrase;
    const heroImages = request.body.images;

    const superhero = new Superhero({
        nickName: heroNicName,
        realName: heroRealName,
        originDescription: heroDescription,
        superpowers: heroSuperPower,
        catchPhrase: heroCatchPhrase,
        images: heroImages
    });

    Superhero.findOneAndUpdate({_id: id}, superhero, {new: true}, function(err, superhero){
        if(err){
            return console.log(err);
        }
        response.send(superhero);
    });
});
