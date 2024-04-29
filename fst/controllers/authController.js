const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/User');
const UserToConfirm = require('../models/UserToConfirm');
const UserForgotPass = require('../models/UserForgotPass');
const multer = require('multer');
const UserPending = require('../models/UserPending');
// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
dotenv.config();

const secret = process.env.JWT_SECRET;
const emailUsername = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: 'amenybouabdallah@gmail.com',
     pass: 'xkti lxpm hbnx emlw'}
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: emailUsername,
    to: email,
    subject: 'Verification Code for Campus Connect',
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
                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:26px;color:#333333;font-size:17px">&nbsp;Vous recevez ce message car vous avez demandé un code de vérification pour Uni Link. Voici votre code : ${code}. Utilisez-le pour confirmer votre identité.<br>Cordialement,</p></td>
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
};

const signUp = async(req, res) => {
	try{
		const{ email, password, role, userType, department} = req.body;
const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

 const hashedPassword = await bcrypt.hash(password, 10);
const userC = new UserToConfirm({
      email,
      password: hashedPassword,
      role,
      userType, 
      department,
      
	
    });
await userC.save();
res.status(201).json({message: 'User Saved and waiting to Complete account'});
}catch(error){
res.status(500).json({message:error.message});}};
//cloudinary settings

const cloudinary = require('../cloudinary/cloudinary');
//complete profile
const streamifier = require('streamifier');


const completeProfile = async (req, res) => {
  try {
      // Extract necessary data from request
      const { fullName, email } = req.body;
      const profileImage = req.file;

      // Check if required fields are present
      if (!fullName || !profileImage) {
          return res.status(400).json({ message: "Full name and profile picture are required" });
      }

      // Upload image to Cloudinary
      const uploadedImage = await streamUpload(profileImage.buffer);
      // confirmation code 
      const verificationCode = generateVerificationCode();
      await sendVerificationEmail(email, verificationCode);

      // Update user's profile
      const user = await UserToConfirm.findOneAndUpdate(
          { email: email },
          { fullName: fullName, profileImage: uploadedImage.secure_url, verificationCode: verificationCode },
          { new: true }
      );

      // Check if user exists
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Send success response
      res.status(200).json({ message: "Profile completed successfully" });
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Function to upload file buffer to Cloudinary using streams
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ upload_preset: "campus" }, (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result);
          }
      });

      require("streamifier").createReadStream(buffer).pipe(stream);
  });
};

//confirm code

const confirmCode = async (req,res) => {
    try{
        const { email, verificationCode } = req.body;
        
        const userToConfirm = await UserToConfirm.findOne({email});

        if (!userToConfirm){
            return res.status(404).json({ message: 'User not found' });
    }else{
    if(userToConfirm.verificationCode===verificationCode){
        const user = new UserPending({
            email: userToConfirm.email,
            password: userToConfirm.password, 
            userType: userToConfirm.userType,
            department: userToConfirm.department,
            fullName: userToConfirm.fullName,
            profileImage: userToConfirm.profileImage,
           
        });
         
        await user.save();
        await UserToConfirm.findOneAndDelete({ email });
    
        res.status(201).json({ message: 'User created successfully' });
    }else{
        return res.status(400).json({ message:'Verification code mismatch'});

    }
  }
   
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    const signIn = async (req, res) => {
      try {
          const { email, password } = req.body;
  
          const user = await User.findOne({ email });
  
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          const isPasswordValid = await bcrypt.compare(password, user.password);
  
          if (!isPasswordValid) {
              return res.status(401).json({ message: 'Invalid password' });
          }
  
          // Assuming user.typeAccount represents the type of the account
          let redirectPath = '/admin/users'; // default redirect path
          if ((user.userType === 'student') || (user.userType === 'teacher')) {
              redirectPath = '/docs';
          }
  
          // JWT token generation
          const token = jwt.sign({ userId: user._id, email: user.email, userType: user.userType }, '69f3db1b769ab7f809bbf657c3b1091d4bb9c34a8d41f8b09bc5e3c72f342289', { expiresIn: '1h' });
  
          res.status(200).json({ message: 'Sign in successful', token, redirectPath });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };
  


  const forgotPassword = async(req, res)=>{
    try{
        const{email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'user not found'});
    }
    const verificationCode = generateVerificationCode();
    await sendVerificationEmail(email, verificationCode);
    
    const userF= new UserForgotPass({
        email: user.email,
        password: user.password,
        role: user.role,
        userType: user.userType,
        department : user.department,
        fullName: user.fullName,
        profileImage: user.profilePicture,
        verificationCode: verificationCode});
    await userF.save();
    res.status(201).json({message: 'User who forgot password is saved and waiting to confirm code'});
    }catch(error){
    res.status(500).json({message:error.message});}};
    
    const confirmCodeForgot = async(req, res)=>{
        try{
            const {email, verificationCode} = req.body;
            const userF = await UserForgotPass.findOne({email});
            if(!userF){
                return res.status(404).json({message: 'User not found'});
        }
            if(userF.verificationCode===verificationCode){
                res.status(201).json({message: 'Code Confirmed lets change passwords'});
        await UserForgotPass.findOneAndDelete({email});
        }else{
            return res.status(400).json({message:'Verification code mismatch'});
        }
        }catch(error){
            res.status(500).json({message: error.message});
        }
        };
    
        const newPassword = async(req, res)=>{
            try{
                const{email, password, confirmPassword} = req.body;
                const user = await User.findOne({email});
                if(!user){
                    return res.status(404).json({message: 'User not found'});
                }
                if (password!==confirmPassword){
                    return res.status(400).json({message: 'Unmatched Passwords, try again.'});
                }
                else{
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password=hashedPassword;
                await user.save();
                res.status(200).json({message:'Password reset successful'});
        }
        }catch(error){
            res.status(500).json({message: error.message});
    }
        }	

       
            

module.exports = {signUp, signIn, forgotPassword, confirmCode, confirmCodeForgot,newPassword,completeProfile};