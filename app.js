var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.post('/banco', function (req, res) {

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

        new sql.Request()
        .query("select id from Cliente where id=" + req.body.id).then(function (result){
            if(result.rowsAffected != 0){
                res.send('Duplicado')
                sql.close()
            } else {
                    new sql.Request()
                    .query("INSERT INTO Cliente (Id, Nombre, Apellido, Fecha) VALUES (" + req.body.id + ",'" + req.body.nombre + "','" + req.body.apellido + "','" + req.body.fecha + "')").then(function (recordset) {
                        res.send('Registro creado')
                        sql.close()
                    }).catch(function (err) {
                        console.log(err);
                        sql.close()
                    });
            }
        }).catch(function (err) {
            console.log(err);
            sql.close()
        });
    })
});



var server = app.listen(5001, function () {
    console.log('Server is running..');
});