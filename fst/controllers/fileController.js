const multer = require('multer');
const path = require('path');
const File = require('../models/File');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage }).single('file');

exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err });
    }
    try {
      const { filename, path, size, mimetype} = req.file;
      const {fullName, selectedDate, docType,uploadedBy} = req.body;
      console.log(fullName, selectedDate, docType,);
      const file = new File({
       fileName: filename,
        path: path,
        size: size,
        mimetype: mimetype,
        docType: docType,
        fullName: fullName,
        selectedDate: selectedDate,
        uploadedBy:uploadedBy
      });
      await file.save();
      File.find({})
      .then((files) => {
        // Log or send the data to console
        console.log(files);
      })
      .catch((err) => {
        // Log or send the error
        console.log(err);
      });
      

      res.status(201).json({ message: 'File uploaded successfully', file });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
};
