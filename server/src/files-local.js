const fs = require('fs');
const URL_SERVER = process.env.URL_SERVER || "http://127.0.0.1:8080";
const FILES_FOLDER = process.env.FILES_FOLDER || "./files/";

function getListHandler(req, res) {
    fs.readdir(FILES_FOLDER, (err, files) => {
        let list = [];
        for (const file of files) {
            list.push(URL_SERVER + "/files/" + file);
        }
        res.status(200);
        res.json(list);
    });
}

function getFileHandler(req, res) {
    return res.download(FILES_FOLDER + req.params.name, (err) => {
        if (err) {
            res.status(404);
            res.json({error: "file not found"});
        }
    });
}

function uploadHandler(req, res) {
    if (!req.file) {
        res.status(400);
        res.json({error: "no files provided"});
        return;
    }
    const name = `${Date.now()}-${req.file.originalname}`;
    fs.writeFile(FILES_FOLDER + name, req.file.buffer, (err) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({error: "could not save file"});
        } else {
            res.status(200);
            res.json({url: URL_SERVER + "/files/" + name});
        }
    });
}

function deleteHandler(req, res) {
    fs.unlink(FILES_FOLDER + req.params.name, function(err) {
        if (err && err.code === 'ENOENT') {
            res.status(404);
            res.json({error: "file not found"});
        } else if (err) {
            res.status(500);
            res.json({error: err});
        } else {
            res.status(200);
            res.json({message: "ok"});
        }
    });
}

module.exports = {
    getListHandler: getListHandler,
    getFileHandler: getFileHandler,
    uploadHandler: uploadHandler,
    deleteHandler: deleteHandler
};