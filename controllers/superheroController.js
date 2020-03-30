const Superhero = require("../model/superhero.js");

exports.createSuperhero = function(request, response){
    response.render("create.hbs");
}

exports.getSuperhero = function(request, response){
    Superhero.find({}, function(err, allSuperheroes){
        if(err){
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("superheroes.hbs", {superheroes: allSuperheroes});
    });
}

exports.getSuperheroId = function(request, response){
    const id = request.params.id;
    console.log(id);
    Superhero.findOne({_id: id}, function(err, superhero){
        if(err){
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("superhero.hbs", superhero);
    });
}

exports.delSuperhero = function(request, response){
    const id = request.params.id;
    Superhero.findByIdAndDelete(id, function(err, superhero){
        if(err){
            return console.log(err);
        }
        response.redirect("/superheroes");
    });
}

exports.postSuperhero =  function(request, response){
   
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
            response.redirect("/superheroes");
        });
}
