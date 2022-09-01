var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var producto = new Schema({
    nombre: String,
    precio: Number,
    imagen: String,
    material: String,
    peso: String,
    dimensiones: String
});

module.exports = mongoose.model("Productos", producto);