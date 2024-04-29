const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {type: String},
  docType:{
    type: String,
      enum:  ['grades', 'announcement', 'schedule']},
  fullName:{type: String},
  selectedDate:{type: Date},
  path: {type: String},
  size: {type: Number},
  mimetype: {type :String},
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy:{type:String}

});

const File = mongoose.model('File', fileSchema);

module.exports = File;