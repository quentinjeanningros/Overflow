function getHandler(req, res) {
    req.my_db.query('SELECT id, title, email FROM contacts', (err, results) => {
        if (err !== null) {
            res.status(500);
            res.json({error: "internal server error"});
        } else {
            res.status(200);
            res.json(results);
        }
    });
}

function postHandler(req, res) {
    const body = req.body;
    req.my_db.query('INSERT INTO contacts (title, email) VALUES ( ?, ? ) ',
        [body.title, body.email], (err, results) => {
            if (err !== null) {
                res.status(400);
                res.json({error: err.sqlMessage});
            } else {
                res.status(200);
                res.json({id: results.insertId});
            }
    });
}

function patchHandler(req, res) {
    const body = req.body;
    req.my_db.query('UPDATE contacts SET title = ?, email = ? WHERE id = ? ',
        [body.title, body.email, body.id], (err, results) => {
            if (err !== null) {
                res.status(400);
                res.json({error: err.sqlMessage});
            } else if (results.affectedRows === 0) {
                res.status(400);
                res.json({error: "this element does not exist"});
            } else {
                res.status(200);
                res.json({message: "ok"});
            }
        });
}

function deleteHandler(req, res) {
    req.my_db.query('DELETE FROM contacts WHERE id = ? ',
        [req.params.id], (err, results) => {
            if (err !== null) {
                res.status(400);
                res.json({error: err.sqlMessage});
            } else if (results.affectedRows === 0) {
                res.status(400);
                res.json({error: "this element does not exist"});
            } else {
                res.status(200);
                res.json({message: "ok"});
            }
        });
}

module.exports = {
    getHandler: getHandler,
    postHandler: postHandler,
    patchHandler: patchHandler,
    deleteHandler: deleteHandler
};
