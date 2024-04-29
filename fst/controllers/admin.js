const User = require('../models/User');
const UserPending = require('../models/UserPending');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const FileConfirmed= require('../models/FileConfirmed');
const FileProfToConfirm=require('../models/FileProfToConfirm');
const File = require('../models/File');
const fs = require('fs');
const path =require('path');

const getUserByEmail = async (req, res) => {
    try {
        // Get the email from the request body
        const { _id } = req.body;

        // Validate the input email
        

        // Find the user by email
        const user = await User.findOne({ _id });

        if (user) {
            // If user is found, return the user data
            res.status(200).json({ user });
        } else {
            // If user is not found, return an error message
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Handle errors and return an appropriate response
        console.error('Error getting user by email:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const changePasswordOrEmail = async (req, res) => {
    try {
        const { email, newEmail, newPassword, confirmPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (newEmail) {
            if (newEmail === user.email) {
                return res.status(400).json({ message: 'New email cannot be the same as the current email' });
            }
            const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            user.email = newEmail;
        }

        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'Unmatched passwords, try again.' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(200).json({ message: 'Update successful' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const userPending = await UserPending.find();

        const filteredUsers = users.filter(user => user.userType);
        const filteredUserPending = userPending.filter(user => user.userType);

        const formattedUsers = filteredUsers.map(user => ({
            id: user.id,
            profileImage: user.profileImage,
            fullName: user.fullName,
            status: 'active',  
            dateCreated: user.dateCreated,
            userType: user.userType,
            email: user.email,
            department: user.department,
        }));

        const formattedUserPending = filteredUserPending.map(user => ({
            id: user.id,
            profileImage: user.profileImage,
            fullName: user.fullName,
            status: 'pending',  
            dateCreated: user.dateCreated,
            userType: user.userType,
            email: user.email,
            department: user.department,
        }));

        const allFormattedUsers = [...formattedUsers, ...formattedUserPending];

        res.status(200).json(allFormattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const handleConfirmAction = async (req, res) => {
    const { action, userIdToConfirm } = req.body;

    try {
        if (action === 'accept') {
            // Accept action: create new user in User module and delete user from UserPending
            const userPending = await UserPending.findById(userIdToConfirm);
            if (userPending) {
                const newUser = new User({

                    email: userPending.email,
                    password: userPending.password,
                    userType: userPending.userType,
                    department: userPending.department,
                    fullName: userPending.fullName,
                    profileImage: userPending.profileImage
                });
                
                // Save the new user to the User model
                await newUser.save();

                // Delete user from UserPending model
                await UserPending.findByIdAndDelete(userIdToConfirm);

                // Send email using nodemailer
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host:'smtp.gmail.com',
                    port:465,
                    secure:true,
                    auth: {
                        user: 'amenybouabdallah@gmail.com',
                        pass: 'xkti lxpm hbnx emlw',
                    },
                });

                const mailOptions = {
                    from: 'amenybouabdallah@gmail.com',
                    to: newUser.email,
                    subject: 'Account Accepted',
                   // text: `Your verification code is: ${code}`,
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New email template 2024-04-29</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <style type="text/css">
#outlook a {
	padding:0;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body data-new-gr-c-s-loaded="14.1169.0" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="fr" style="background-color:#F6F6F6"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://fhohrpt.stripocdn.email/content/guids/d591ca56-a27c-4c35-a1f3-6114289ed0c1/images/uni_linkmodified.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="150"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#a70020;font-size:14px"><span style="font-size:20px">Bonjour</span>,</p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:26px;color:#333333;font-size:17px">Nous vous informons que votre compte a été confirmé par notre équipe d'administration. Vous pouvez maintenant vous connecter en visitant notre site web.</p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#22228c;font-size:20px">L'équipe Uni Link</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>
  `
  };

                await transporter.sendMail(mailOptions);

                res.status(200).send(`Accepted user with ID ${userIdToConfirm}`);
            } else {
                res.status(404).send(`UserPending with ID ${userIdToConfirm} not found`);
            }
        } else if (action === 'reject') {
            // Reject action: delete user from UserPending
            const result = await UserPending.findByIdAndDelete(userIdToConfirm);
            if (result) {
                res.status(200).send(`Rejected user with ID ${userIdToConfirm}`);
            } else {
                res.status(404).send(`UserPending with ID ${userIdToConfirm} not found`);
            }
        } else if (action === 'delete') {
            // Delete action: delete user from User
            const result = await User.findByIdAndDelete(userIdToConfirm);
            if (result) {
                res.status(200).send(`Deleted user with ID ${userIdToConfirm}`);
            } else {
                res.status(404).send(`User with ID ${userIdToConfirm} not found`);
            }
        } else {
            // Invalid action
            res.status(400).send('Invalid action');
        }
    } catch (error) {
        console.error(`Error handling action: ${action}`, error);
        res.status(500).send('Internal server error');
    }
};

const getDocuments = async (req, res) => {
    try {
        // Fetch files from both collections
        const filesToConfirm = await FileProfToConfirm.find();
        const filesConfirmed = await FileConfirmed.find();
        const fileAdmin = await File.find();
        // Function to format a file document
        const formatFile = async (file, status) => {
            // Fetch the user based on uploadedBy field
            const user = await User.findById(file.uploadedBy);
            let submitted;

if (user) {
    if (user.userType) {
        submitted = user.fullName; // Assign user.fullName to submittedBy
    } else {
        submitted = 'Admin'; // Assign 'Admin' to submittedBy if userType is not teacher or student
    }
} else {
    submitted = 'Unknown'; // Assign 'Unknown' to submittedBy if user does not exist
}

            // Return the formatted file document
            return {
                // Populate the fields
                _id: file._id,
                fullName: file.fullName,
                selectedDate: file.selectedDate,
                uploadedAt: file.uploadedAt,
                docType: file.docType,
                status: status, // 'pending' or 'accepted' depending on the collection
                submittedBy: submitted

            };
        };

        // Format files from FileProfToConfirm collection
        const formattedFilesToConfirm = await Promise.all(
            filesToConfirm.map(file => formatFile(file, 'pending'))
        );

        // Format files from FileConfirmed collection
        const formattedFilesConfirmed = await Promise.all(
            filesConfirmed.map(file => formatFile(file, 'accepted'))
        );
        const formattedFileAdmin = await Promise.all(
            fileAdmin.map(file=>formatFile(file,'accepted'))
        )

        // Combine formatted files
        const allFormattedFiles = [...formattedFilesToConfirm, ...formattedFilesConfirmed,...formattedFileAdmin];

        // Send response with the formatted files
        res.status(200).json(allFormattedFiles);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
    
const handleConfirmActionDocs = async (req, res)=>{
    const{action,docIdToConfirm} = req.body;
    try{
        if (action ==='accept')
        {
            const filePending= await FileProfToConfirm.findById(docIdToConfirm);
            if(filePending){
                const newFile = new FileConfirmed({
                    fileName:filePending.fileName,
                    docType: filePending.docType,
                    fullName:filePending.fullName,
                    selectedDate:filePending.selectedDate,
                    uploadedAt:filePending.uploadedAt,
                    uploadedBy:filePending.uploadedBy,
                    path:filePending.path,
                    size:filePending.size,
                    mimeType:filePending.mimeType
                    
                });
                await newFile.save();
                await FileProfToConfirm.findByIdAndDelete(docIdToConfirm);
                res.status(200).json({message:'Document accepted'});
            }
            else{
                res.status(404).json({message:'Document not found'});
            }

        }else if(action==='reject'){
            const result = await FileProfToConfirm.findByIdAndDelete(docIdToConfirm);
            if(result){
                res.status(200).json({message:'Document rejected'});
            }else{
                res.status(404).json({message:'Document not found'});
            }
        }else if(action==='delete'){
            let result = await FileConfirmed.findByIdAndDelete(docIdToConfirm);
            if (!result) {
                result = await File.findByIdAndDelete(docIdToConfirm);
            }
            if(result){
                res.status(200).json({message:'Document deleted'});
            }else{
                res.status(404).json({message:'Document not found'});
            }
        }else {
            res.status(400).json({message:'Invalid action'});
        }
    }catch(error){
        console.error(`Error handling action: ${action}`, error);
        res.status(500).json({message:'Internal server error'});
    }
}
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
        if(!file){
            file = await FileProfToConfirm.findById(docId);
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
    getUserByEmail,changePasswordOrEmail, getUsers, handleConfirmAction,getDocuments, handleConfirmActionDocs,downloadFile
};
