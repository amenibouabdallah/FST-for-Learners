const User = require('../models/User');
const FileProfiToConfirm =require('../models/FileProfToConfirm');
const FileConfirmed=require('../models/FileConfirmed');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('../cloudinary/cloudinary');
const streamifier = require('streamifier');
const path =require('path');
const File = require('../models/File');
const fs = require('fs');
const getUserByEmail = async (req, res) => {
    try {
        const { _id } = req.body;

        // Find the user by ID
        const user = await User.findOne({ _id });

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user by email:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const changePasswordOrEmailOrFullNameOrProfilePicture = async (req, res) => {
    try {
        const { email, newEmail, newPassword, confirmPassword, newFullName } = req.body;
        const profileImage = req.file;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Handle email change
        if (newEmail) {
            // Ensure the new email is different and not already in use
            if (newEmail === user.email) {
                return res.status(400).json({ message: 'New email cannot be the same as the current email' });
            }
            const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            user.email = newEmail;
        }

        // Handle password change
        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // Handle full name change
        if (newFullName) {
            user.fullName = newFullName;
        }

        // Handle profile picture change
        if (profileImage) {
            const uploadedImage = await streamUpload(profileImage.buffer);
            user.profileImage = uploadedImage.secure_url;
        }

        // Save the updated user information
        await user.save();

        res.status(200).json({ message: 'Update successful' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to upload file buffer to Cloudinary using streams
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

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

 const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }
      try {
        const { filename, path, size, mimetype} = req.file;
        const {fullName, selectedDate, docType, uploadedBy} = req.body;
        console.log(fullName, selectedDate, docType);
        const file = new FileProfiToConfirm({

         fileName: filename,
          path: path,
          size: size,
          mimetype: mimetype,
          docType: docType,
          fullName: fullName,
          selectedDate: selectedDate,
          uploadedBy:uploadedBy,
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

  const getDocuments = async (req, res) => {
    try {
        // Fetch files from both collections
        const filesConfirmed = await FileConfirmed.find();
        const fileAdmin = await File.find();
        // Function to format a file document
        const formatFile = async (file, status) => {
            // Fetch the user based on uploadedBy field
            const user = await User.findById(file.uploadedBy);
            let submitted;

if (user) {
    if (user.userType) {
        submitted = user.fullName; 
    } else {
        submitted = 'Admin'; 
    }
} else {
    submitted = 'Unknown'; 
}

            
            return {
                _id: file._id,
                fullName: file.fullName,
                selectedDate: file.selectedDate,
                uploadedAt: file.uploadedAt,
                docType: file.docType,
                status: status, 
                submittedBy: submitted

            };
        };

       

        // Format files from FileConfirmed collection
        const formattedFilesConfirmed = await Promise.all(
            filesConfirmed.map(file => formatFile(file, 'accepted'))
        );
        const formattedFileAdmin = await Promise.all(
            fileAdmin.map(file=>formatFile(file,'accepted'))
        )

        // Combine formatted files
        const allFormattedFiles = [ ...formattedFilesConfirmed,...formattedFileAdmin];

        // Send response with the formatted files
        res.status(200).json(allFormattedFiles);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const downloadFile = async (req, res) => {
    try {
        const { docId } = req.body;

        // Ensure docId is provided
        if (!docId) {
            return res.status(400).json({ message: 'docId is required in the request body' });
        }

        // Fetch the file record from the database
        let file = await File.findById(docId);
        if (!file) {
            file = await FileConfirmed.findById(docId);
        }

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Log the file path to debug potential issues
        console.log('File path:', file.path);

        // Verify if the file exists
        if (!fs.existsSync(file.path)) {
            return res.status(404).json({ message: 'File not found on the server' });
        }

        // Set the appropriate headers for the file download
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${file.fullName}"`,
        });

        // Send the file as a response using a try-catch block
        try {
            res.sendFile(path.resolve(file.path));
        } catch (error) {
            console.error('Error sending file:', error);
            return res.status(500).json({ message: 'Error sending file' });
        }

    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getUserByEmail,
    changePasswordOrEmailOrFullNameOrProfilePicture,uploadFile,getDocuments,downloadFile
};
