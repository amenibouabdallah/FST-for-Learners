const mongoose = require('mongoose');

const fileProfToConfirmSchema = new mongoose.Schema({
  fileName: {type: String},
  docType:{
    type: String,
      enum:  ['cours', 'td','tp','exam']},
  fullName:{type: String},
  selectedDate:{type: Date},
  path: {type: String},
  size: {type: Number},
  mimetype: {type :String},
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy:{type:String}
});

const File = mongoose.model('FileProfToConfirm', fileProfToConfirmSchema);

module.exports = File;