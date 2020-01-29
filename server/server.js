// Environment variables
const host = process.env.HOST || "8080";
const local = !process.env.USE_GCP || process.env.USE_GCP !== "TRUE";

// Require libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

// Require modules
const db = require('./src/database');
const auth = require('./src/auth');
const contacts = require('./src/contacts');
const partnerships = require('./src/partnerships');
const events = require('./src/events');
const files = require(local ? './src/files-local.js' : './src/files-gcp.js');

// Creating server router
const app = express();
const myBodyParser = (req, res, next) => {
    bodyParser.json()(req, res, (err) => {
        if (err) {
            res.status(400);
            res.json({error: "invalid json body"});
        } else {
            next();
        }
    });
};

// Middleware
app.use(cors());
app.use(function (req, res, next) {
    console.log("Received request: %s %s from %s", req.method, req.originalUrl, req.headers['x-forwarded-for'] || req.ip.slice(7));
    next();
});

// API routes
app.post('/login', myBodyParser, db.middleware, auth.loginHandler);
app.post('/create', myBodyParser, db.middleware, auth.middleware, auth.createHandler);

app.get('/contacts', db.middleware, contacts.getHandler);
app.post('/contacts', myBodyParser, db.middleware, auth.middleware, contacts.postHandler);
app.patch('/contacts', myBodyParser, db.middleware, auth.middleware, contacts.patchHandler);
app.delete('/contacts/:id', db.middleware, auth.middleware, contacts.deleteHandler);

app.get('/partnerships', db.middleware, partnerships.getHandler);
app.post('/partnerships', myBodyParser, db.middleware, auth.middleware, partnerships.postHandler);
app.patch('/partnerships', myBodyParser, db.middleware, auth.middleware, partnerships.patchHandler);
app.delete('/partnerships/:id', db.middleware, auth.middleware, partnerships.deleteHandler);

app.get('/events', db.middleware, events.getHandler);
app.post('/events', myBodyParser, db.middleware, auth.middleware, events.postHandler);
app.patch('/events', myBodyParser, db.middleware, auth.middleware, events.patchHandler);
app.delete('/events/:id', db.middleware, auth.middleware, events.deleteHandler);

app.get('/files', files.getListHandler);
app.get('/files/:name', files.getFileHandler);
app.post('/files', db.middleware, auth.middleware, multer.single('file'), files.uploadHandler);
app.delete('/files/:name', myBodyParser, db.middleware, auth.middleware, files.deleteHandler);

// Invalid route management
app.use(function (req, res) {
   res.status(404);
   res.json({error: "invalid route"});
});

// Launching database and server
db.connect();
app.listen(host, function () {
    console.log(`Starting overflow backend on ${host}`);
    if (local) {
        console.log("Using local file storage");
    } else {
        console.log("Using GCP file storage");
    }
});