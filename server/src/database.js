// Require libraries
const mysql = require("mysql");

// Database initialization
const config = {
    user: process.env.MYSQL_USER || "overflow",
    password: process.env.MYSQL_PASSWORD || "overflowpassword",
    database: process.env.MYSQL_DATABASE || "overflow",
    host: process.env.MYSQL_HOST || "127.0.0.1",
};
let connection = mysql.createConnection(config);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function resetConnection() {
    connection = mysql.createConnection(config)
}

function pingDatabase() {
    connection.ping();
}

// Middleware to active database in a route
async function middleware(req, res, next) {
    if (connection.state === "authenticated") {
        req.my_db = connection;
        next();
    } else {
        res.status(500);
        res.json({error: "internal server error: not connected to database"});
    }
}

function connect() {
    connection.connect(async function(err) {
        if (err) {
            console.log("Could not connect to database, retry in 3 seconds");
            await sleep(3000);
            await resetConnection();
            connect();
        } else {
            let interval = setInterval(pingDatabase, 10000);
            connection.on('error', async function(err) {
                if(err.fatal === true) {
                    console.log("Connection to database lost");
                    clearInterval(interval);
                    await resetConnection();
                    connect(null);
                }
            });
            console.log("Connection to database succeed");
        }
    });
}

module.exports = {
    middleware: middleware,
    connect: connect
};
