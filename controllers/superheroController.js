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
        let superheroes = [];
        allSuperheroes.forEach((item) => {
            superheroes.push({
                id: item._id,
                nickName: item.nickName,
                image: item.images[0]
            });
        });
        response.render("superheroes.hbs", {
            superheroes: superheroes
        });
    });
}

exports.getSuperheroId = function (request, response) {
    const id = request.params.id;
    Superhero.findOne({
        _id: id
    }, function (err, superhero) {
        if (err) {
            return response.sendStatus(400);
        }
        if (request._parsedOriginalUrl.path.match(/edit/i)) {
            response.render("edit.hbs", superhero);
        } else {
            response.render("dossier.hbs", superhero);
        }
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

    let filesdata = request.files;
    if (filesdata.lenght == 0)
        return response.status(400).send(`filesdata`);
    if (!request.body) {
        return response.status(400).send(`body`);
    }
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

    superhero.save(function (err) {
        if (err) {
            return console.log(err);
        }
        response.redirect("/dossier" + superhero.id);
    });
}

exports.putSuperhero = function (request, response) {

    if (!request.body) {
        return response.sendStatus(400);
    }
    let id = request.params.id;

    const heroNicName = request.body.nickName;
    const heroRealName = request.body.realName;
    const heroDescription = request.body.originDescription;
    const heroSuperPower = request.body.superpowers;
    const heroCatchPhrase = request.body.catchPhrase;

    const newSuperhero = {
        nickName: heroNicName,
        realName: heroRealName,
        originDescription: heroDescription,
        superpowers: heroSuperPower,
        catchPhrase: heroCatchPhrase,
    }

    Superhero.findOneAndUpdate({
        _id: id
    }, newSuperhero, {
        new: true
    }, function (err, superhero) {
        if (err) {
            return console.log(err);
        }
        response.redirect("/dossier" + superhero.id);
    });
}

exports.putSuperheroImg = function (request, response) {
    console.log(request.body);
    response.redirect("/dossier" + request.params.id);
}