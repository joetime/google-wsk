"use strict";
var sql = require('mssql'); 
var query = require('./query.js');
var config = require('./dbconfig.js');
var express = require('express');
//var jasmine = require('jasmine');
var app = express();

// config sql & connect
var config = config.sqlConfig;
sql.connect(config, function(err) {

    var request = new sql.Request();
    request.query('select top 1 * from hzBrokers where id = 1', function(err, recordset) {
        // ... error checks 
        if (err) console.error('error connecting to db');
        else if(recordset[0].Id == 1) console.dir("DB Connection OK");
        else console.error('error in query');
    });
});


function apiCallSingleGeneric(fn, id, res) {
    fn( sql, id,
       // success
       function (d) { res.send(d) },
       // error
       function (err) { res.send(err) },
       // not found
       function (msg) { res.send(msg) });
}

function apiCallAllGeneric(fn, res) {
    fn( sql,
       // success
       function (d) { res.send(d) },
       // error
       function (err) { res.send(err) },
       // not found
       function (msg) { res.send(msg) });
}

// specify app as a public directory
app.use(express.static(__dirname + '/dist'));
//app.use(express.static(__dirname + '/app/styles'));


app.get ('/api/policy/:groupNumber', function( req, res ) {

    query.getClientByGroupNumber(
        sql, 
        req.params.groupNumber,
        // success
        function (client) {
            if (client.BrokerId > 0) {
                // found client... search for broker
                query.getBrokerById(
                    sql, 
                    client.BrokerId,
                    // found broker
                    function (broker) {
                        res.send({ client: client, broker: broker });    
                    },
                    // broker error
                    function(err) { res.send(err) },
                    // broker not found
                    function(msg) { res.send({ client: client, broker: null }) }
                )
            }
            // broker is null
            else {
                res.send({ client: client, broker: null })
            }
        },
        // error
        function (err) { res.send(err) },
        // not found
        function (msg) { res.send(msg) }
    );
});

app.get('/api/broker/:id', function(req, res) {
    apiCallSingleGeneric(query.getBrokerById, req.params.id, res); 
});

app.get('/api/broker', function(req, res) {
    apiCallAllGeneric(query.getBrokers, res); 
});

app.get('/api/client/:id', function(req, res) {
    apiCallSingleGeneric(query.getClientById, req.params.id, res);    
});
app.get('/api/client', function(req, res) {
    apiCallAllGeneric(query.getClients, res);    
});

// serve static files
app.get('/*', function(req,res) { 
    //console.log(req);
    var path = __dirname.replace("/server", "/dist") + req.url;
    console.log('static file request:', path);
    res.sendFile(path); 
 });

// serves the home page
app.get('/', function(req,res) { 
    var path = __dirname.replace("/server", "/dist/index.html");
    console.log('static file request:', path);
    res.sendFile(path); 
 });





app.listen(process.env.PORT || 4730);