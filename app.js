var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.use('/banco', function (req, res) {

    //console.dir(req)
        
    req.header("Access-Control-Allow-Origin", "*");    
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'MELINA',
        password: 'melina1234',
        server: 'localhost', 
        driver: 'tedious',
        database: 'Banco',
        port: 62452,
        options: {
            encrypt: false, // Use this if you're on Windows Azure
            instanceName: 'TUENLACETV'
        }
    };

    sql.connect(config).then(function () {
        
        //Inline query without parameter 
        new sql.Request()
        .query("INSERT INTO Cliente (Id, Nombre, Apellido) VALUES (" + req.body.id + ",'" + req.body.nombre + "','" + req.body.apellido + "')").then(function (recordset) {
            console.dir(res)
            //console.dir(recordset.recordsets);
            res.send('Registro creado')
        }).catch(function (err) {
            console.log(err);
        });
      
    })
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});