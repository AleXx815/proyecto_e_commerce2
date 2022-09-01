var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Pago = new Schema({
    nombre: String,
    apellido: String, 
    edad: Number,
    correo: String,
    visa: {
        type: Boolean,
        default: true
    }, 
    tarjeta_de_credito: { 
        type: Boolean,
        default: true
    },
    numero: Number,
    fecha: String,
    codigo: Number,
    mensaje: String 
},
    {versionKey: false}
);

module.exports = mongoose.model("Pagos", Pago);