const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Superhero", superheroScheme);
