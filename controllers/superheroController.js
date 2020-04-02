const Superhero = require("../model/superhero.js");

exports.createSuperhero = function (request, response) {
    response.render("create.hbs");
}

exports.getSuperheroes = function (request, response) {
    Superhero.find({}, function (err, allSuperheroes) {
        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("superheroes.hbs", {
            superheroes: allSuperheroes.map(hero => hero.toObject({ virtuals: true }))
        });
    });
}

exports.getSuperheroId = function (request, response) {
    const id = request.params.id;
    Superhero.findOne({
        _id: id
    }, function (err, superhero) {
        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("superhero.hbs", superhero);
    });
}

exports.delSuperhero = function (request, response) {
    const id = request.params.id;
    Superhero.findByIdAndDelete(id, function (err, superhero) {
        if (err) {
            return console.log(err);
        }
        response.redirect("/");
    });
}

exports.postSuperhero = function (request, response) {

    console.log("TEST");
    let filesdata = request.files;
    if (filesdata.lenght == 0)
        return response.status(400).send(`filesdata`);
    if (!request.body) {
        return response.status(400).send(`body`);
    }
    console.log(filesdata);
    let heroNicName = request.body.nickName;
    let heroRealName = request.body.realName;
    let heroDescription = request.body.originDescription;
    let heroSuperPower = request.body.superpowers;
    let heroCatchPhrase = request.body.catchPhrase;
    let heroImages = [];

    filesdata.forEach((item) => {
        heroImages.push("/images/" + item.originalname);
    });

    const superhero = new Superhero({
        nickName: heroNicName,
        realName: heroRealName,
        originDescription: heroDescription,
        superpowers: heroSuperPower,
        catchPhrase: heroCatchPhrase,
        images: heroImages
    });

    //         const superhero = new Superhero({
    //     nickName: "Spider-Man",
    //     realName: "Piter Parker",
    //     originDescription: "an unusual spider bit him",
    //     superpowers: "​Spider-Man received superpower, increased dexterity, “spider instinct”, as well as the ability to stay on steep surfaces and release cobwebs from his hands using a device of his own invention",
    //     catchPhrase: "Friendly neighbor spiderman",
    //     images: ["/images/spider_man.jpg", "/images/231px-AmazingSpiderMan50.jpg"]
    // });


    superhero.save(function (err) {
        if (err) {
            return console.log(err);
        }
        response.redirect("/superhero" + superhero.id);
    });
}

exports.postImage = function (request, response) {
    let filedata = request.file;
    let id = request.body.id;
    if (!filedata)
        return response.sendStatus(400);
    else {
        Superhero.findOne({
            _id: id
        }, function (err, superhero) {
            superhero.images.push("/images/" + filedata.originalname);
            superhero.save();
        });
        response.redirect("/superhero" + request.body.id);
    }
}

exports.putSuperhero = function (request, response) {

    if (!request.body) {
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

    Superhero.findOneAndUpdate({
        _id: id
    }, superhero, {
        new: true
    }, function (err, superhero) {
        if (err) {
            return console.log(err);
        }
        response.render("superhero.hbs", superhero);
    });
}
