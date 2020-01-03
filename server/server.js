// Environment variables
const host = process.env.HOST || "8080";

// Require libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Require modules
const db = require('./src/database');
const auth = require('./src/auth');
const contacts = require('./src/contacts');
const partnerships = require('./src/partnerships');
const events = require('./src/events');

// Creating server router
const app = express();

// Middleware
app.use(cors());
app.use(function (req, res, next) {
    console.log("Received request: %s %s from %s", req.method, req.originalUrl, req.headers['x-forwarded-for'] || req.ip.slice(7));
    next();
});
app.use((req, res, next) => {
    bodyParser.json()(req, res, (err) => {
        if (err) {
            res.status(400);
            res.json({error: "invalid json body"});
        } else {
            next();
        }
    });
});

// API routes
app.post('/login', db.middleware, auth.loginHandler);
app.post('/create', db.middleware, auth.middleware, auth.createHandler);

app.get('/contacts', db.middleware, contacts.getHandler);
app.post('/contacts', db.middleware, auth.middleware, contacts.postHandler);
app.patch('/contacts', db.middleware, auth.middleware, contacts.patchHandler);
app.delete('/contacts', db.middleware, auth.middleware, contacts.deleteHandler);

app.get('/partnerships', db.middleware, partnerships.getHandler);
app.post('/partnerships', db.middleware, auth.middleware, partnerships.postHandler);
app.patch('/partnerships', db.middleware, auth.middleware, partnerships.patchHandler);
app.delete('/partnerships', db.middleware, auth.middleware, partnerships.deleteHandler);

app.get('/events', db.middleware, events.getHandler);
app.post('/events', db.middleware, auth.middleware, events.postHandler);
app.patch('/events', db.middleware, auth.middleware, events.patchHandler);
app.delete('/events', db.middleware, auth.middleware, events.deleteHandler);

// Invalid route management
app.use(function (req, res) {
   res.status(404);
   res.json({error: "invalid route"});
});

// Launching database and server
db.connect();
app.listen(host, function () {
    console.log(`Starting overflow backend on ${host}`);
});