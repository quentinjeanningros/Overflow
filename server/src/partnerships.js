function getHandler(req, res) {
    req.my_db.query('SELECT id, name, image, info, epitech, eartsup, iseg FROM partnerships', (err, results) => {
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
    req.my_db.query('INSERT INTO partnerships (name, image, info, epitech, eartsup, iseg) VALUES ( ?, ?, ?, ?, ?, ? ) ',
        [body.name, body.image, body.info, body.epitech, body.eartsup, body.iseg], (err, results) => {
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
    req.my_db.query('UPDATE partnerships SET name = ?, image = ?, info = ?, epitech = ?, eartsup = ?, iseg = ? WHERE id = ? ',
        [body.name, body.image, body.info, body.epitech, body.eartsup, body.iseg, body.id], (err, results) => {
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
    req.my_db.query('DELETE FROM partnerships WHERE id = ? ',
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
