const cloudinary = require("cloudinary").v2;
require("dotenv").config();

 
          
cloudinary.config({ 
  cloud_name: 'dnkrngofd', 
  api_key: '561683362518161', 
  api_secret: 'XhBl3myQYDfEBdRJs-hqTGNJ0DU' 
});

module.exports= cloudinary;