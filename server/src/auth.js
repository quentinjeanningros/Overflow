const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET || "overflowjwtsecret";

function generateToken(id, username, ttl) {
    return jwt.sign({
        id, username
    }, jwt_secret, {expiresIn: ttl});
}

function verifyAuthBody(body, fields) {
    for (let field of fields) {
        if (body.hasOwnProperty(field) === false ||
            typeof body[field] !== 'string' ||
            body[field].length < 3 || body[field].length > 255) {
            return false
        }
    }
    return true;
}

function getUserByUsername(db, username, callback) {
    db.query(
        'SELECT id, username, password FROM users WHERE username = ?',
        username,
        callback);
}

function createUser(db, username, password, callback) {
    db.query(
        'INSERT INTO users (username, password) VALUES ( ?, ? ) ',
        [username, password],
        callback);
}

exports.loginHandler = function (req, res) {
    if (verifyAuthBody(req.body, ["username", "password"]) === false) {
        res.status(400);
        res.json({error: "invalid request body"});
        return;
    }
    getUserByUsername(req.my_db, req.body.username, (err, results) => {
        if (err !== null || results.length !== 1 || req.body.password !==  results[0].password) {
            res.status(400);
            res.json({error: "invalid username and/or password"});
        } else {
            res.status(200);
            res.json({
                id: results[0].id,
                username: results[0].username,
                token: generateToken(results[0].id, results[0].username, '5h')
            });
        }
    });
};

exports.createHandler = function (req, res) {
    if (verifyAuthBody(req.body, ["username", "password"]) === false) {
        res.status(400);
        res.json({error: "invalid request body"});
        return;
    }
    createUser(req.my_db, req.body.username, req.body.password, (err, results) => {
        if (err !== null) {
            res.status(400);
            res.json({error: "username already exists"});
        } else {
            getUserByUsername(req.my_db, req.body.username, (err, results) => {
                res.status(200);
                res.json({
                    id: results[0].id,
                    username: results[0].username
                });
            });
        }
    });
};

exports.middleware = function (req, res, next) {
    let token = req.header('Authorization');
    if (token === undefined) {
        res.status(401);
        res.json({error: "missing authorization header"});
        return;
    }
    jwt.verify(token, jwt_secret, function (err, decoded) {
        if (err) {
            res.status(401);
            res.json({error: "token is not valid"});
        } else {
            req.my_username = decoded.username;
            req.my_user_id = decoded.id;
            next();
        }
    });
};
