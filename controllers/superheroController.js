const Superhero = require("../model/superhero.js");
const fs = require("fs");

exports.createSuperhero = (request, response) => {
    response.render("create.hbs");
}

// exports.getSuperheroes = (request, response) => {
//     Superhero.find({}, function (err, allSuperheroes) {
//         if (err) {
//             console.log(err);
//             return response.sendStatus(400);
//         }
//         let superheroes = [];
//         allSuperheroes.forEach((item) => {
//             superheroes.push({
//                 id: item._id,
//                 nickName: item.nickName,
//                 image: item.images[0]
//             });
//         });
//         response.render("superheroes.hbs", {
//             superheroes: superheroes
//         });
//     });
// }


////////////////////////////
exports.getSuperheroesPage = (req, res) => {

    const perPage = 5; // results per page
    const page = req.params.page > 0 ? req.params.page : 1; // Page
    Superhero
        .find({})
        .limit(perPage)
        .skip(perPage * page - perPage)
        .exec(function (err, allSuperheroes) {
            if (err) {
                console.log(err);
                return response.sendStatus(400);
            }

            Superhero
                .countDocuments()
                .exec(function (err, count) {
                    let superheroes = [];
                    let pages = [];
                    for(let i = 1; i <= Math.ceil(count / perPage); i++){
                        pages.push(i);
                    }
                    allSuperheroes.forEach((item) => {
                        superheroes.push({
                            id: item._id,
                            nickName: item.nickName,
                            image: item.images[0]
                        });
                    });
                    res.render('superheroes.hbs', {
                        superheroes: superheroes,
                        page: page,
                        pages: pages
                    })
                })
        })
};

///////////////////////////

exports.getSuperheroId = (request, response) => {
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

exports.delSuperhero = (request, response) => {
    const id = request.params.id;
    Superhero.findByIdAndDelete(id, function (err, superhero) {
        if (err) {
            return console.log(err);
        }
        response.redirect("/");
    });
}

exports.postSuperhero = (request, response) => {

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

exports.putSuperhero = (request, response) => {

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

exports.delSuperheroImg = (request, response) => {

    let id = request.params.id;
    let images = request.body;
    console.log(images);
    Superhero.findOne({
        _id: id
    }, function (err, superhero) {
        if (err) {
            return response.sendStatus(400);
        } else {
            images.forEach((item) => {
                superhero.images.splice(superhero.images.indexOf(item), 1);
                fs.unlinkSync("./public" + item)
            });

            superhero.save(function (err) {
                if (err) throw err;

                console.log('Superhero updated successfully');
            });
        }
    });
    return response.status(200).send(`delete complit`);
}

exports.addSuperheroImg = (request, response) => {

    let id = request.params.id;
    let filesdata = request.files;
    if (filesdata.lenght == 0)
        return response.status(400).send(`filesdata`);

    Superhero.findOne({
        _id: id
    }, function (err, superhero) {
        if (err) {
            return response.sendStatus(400);
        } else {
            filesdata.forEach((item) => {
                superhero.images.push("/images/" + item.originalname);
            });

            superhero.save(function (err) {
                if (err) throw err;

                response.redirect("/dossier" + superhero.id)
            });
        }
    });
}