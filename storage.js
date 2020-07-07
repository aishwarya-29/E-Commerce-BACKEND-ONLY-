var mongoose        =       require("mongoose"),
    path            =       require("path"),
    crypto          =       require("crypto"),
    multer          =       require("multer"),
    GridFsStorage   =       require("multer-gridfs-storage"),
    Grid            =       require("gridfs-stream"),
    config          =       require("./config");


var conn = mongoose.connection;

// GridFS
//initialise gfs
let gfs;
conn.once('open', function () {
    // initialised stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "folder1"
    });
});

//create storage engine

var storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'folder1',
                    key: String
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({
    storage
});

module.exports = upload;