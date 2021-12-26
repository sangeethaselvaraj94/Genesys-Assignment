/**
 * Importing necessary modules
 */
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const { mongoDBConnection } = require("/db/mongodb");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Router for handling Http request 

const api = require("./routes/api");
app.use("/api", api);

const port = normalizePort(9091);
var server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

mongoDBConnection();

// Normalize a port into a number, string, or false.

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port))
        return val; //pipe
    if (port >= 0)
        return port; //port
    return false;
}

//Event listener for HTTP server "error" event.  

function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
        case "EACCES":
            console.log(bind + " requires elevated privileges");
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(bind + " is already in use");
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("App listening on " + bind);
}
