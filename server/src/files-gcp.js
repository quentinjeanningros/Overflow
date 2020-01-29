const {Storage} = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID || 'bde-overflow'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = process.env.GOOGLE_CLOUD_KEYFILE || 'bde-overflow.json'; // Replace with the path to the downloaded private key
const BUCKET_NAME = process.env.BUCKET_NAME || 'bucket-bde-overflow'; // Replace with the name of your bucket

const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

function getPublicUrl(bucketName, fileName) {
    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

function sendUploadToGCS(req, res, next) {
    if (!req.file) {
        return next();
    }

    const bucket = storage.bucket(BUCKET_NAME);
    const gcsFileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        console.log(err);
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsFileName;

        return file.makePublic()
            .then(() => {
                req.file.gcsUrl = getPublicUrl(BUCKET_NAME, gcsFileName);
                next();
            })
            .catch((err) => {
                next(err);
            });
    });

    stream.end(req.file.buffer);
}

function getListHandler(req, res) {
    return storage.bucket(BUCKET_NAME).getFiles()
        .then((files) => {
            let list = [];
            for (const array of files) {
                for (const file of array) {
                    list.push(getPublicUrl(BUCKET_NAME, file.name));
                }
            }
            res.status(200);
            res.json(list);
        })
        .catch((err) => {
            console.log(err);
            res.status(400);
            res.json({error: "could not get files list"});
        })
}

function getFileHandler(req, res) {
    res.status(404);
    res.json({error: "no files saved on this server"});
}

function uploadHandler(req, res) {
    return sendUploadToGCS(req, res, (err) => {
        if (err) {
            res.status(500);
            res.json({error: err});
        } else if (!req.file) {
            res.status(400);
            res.json({error: "no file provided"});
        } else {
            res.status(200);
            res.json({url: req.file.gcsUrl});
        }
    });
}

function deleteHandler(req, res) {
    return storage.bucket(BUCKET_NAME).file(req.params.name).delete()
        .then(() => {
            res.status(200);
            res.json({message: "ok"});
        })
        .catch((err) => {
            console.log(err);
            res.status(400);
            res.json({error: "file not found"});
        })
}

module.exports = {
    getListHandler: getListHandler,
    getFileHandler: getFileHandler,
    uploadHandler: uploadHandler,
    deleteHandler: deleteHandler
};