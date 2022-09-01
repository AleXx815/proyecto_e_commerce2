var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose
.connect(
    "mongodb+srv://AleXx:Sonic40402@cluster0.xop2tsp.mongodb.net/E-commerce?retryWrites=true&w=majority"
)
.then(function(db){
    console.log("Conectado a la base de datos");
})
.catch(function(err){
    console.log(err);
});

// modulo de datos
var Prods = require("./models/productos");
var Pag = require("./models/pagos");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/inicio", function(req, res){
    res.sendFile(__dirname + "/index.html"); 
});

app.get("/producto/:id", async function (req, res) {
    res.sendFile(__dirname + "/detalle.html");
});

app.post("/producto/:id", async function (req, res) {
    var identificador = req.params.id;
    var busqueda = await Prods.findById(identificador);
    res.send(busqueda);
});

app.get("/formulario", function(req, res){
    res.sendFile(__dirname + "/formulario.html"); 
});

app.post("/pago", async function(req, res){
    var datos_form = req.body;
    var p = new Pag(datos_form);
    await p.save();
    res.send("Datos insertados correctamente");
});


app.listen(3000, function(){
    console.log("Servidor iniciado en el puerto 3000");
});