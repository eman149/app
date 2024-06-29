
const multer = require('multer')
///const storage = multer.()  // store image in memory
const multerStorage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}.${ext}`);
    }
});

const upload = multer({storage:multerStorage})

module.exports = upload