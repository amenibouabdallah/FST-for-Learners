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
    <title>Empty template</title><!--[if (mso 16)]>
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
  .rollover:hover .rollover-first {
    max-height:0px!important;
    display:none!important;
    }
    .rollover:hover .rollover-second {
    max-height:none!important;
    display:block!important;
    }
    .rollover span {
    font-size:0px;
    }
    u + .body img ~ div div {
    display:none;
    }
    #outlook a {
    padding:0;
    }
    span.MsoHyperlink,
  span.MsoHyperlinkFollowed {
    color:inherit;
    mso-style-priority:99;
    }
    a.es-button {
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
    .es-button-border:hover > a.es-button {
    color:#ffffff!important;
    }
  @media only screen and (max-width:600px) {*[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .es-text-8870, .es-text-8870 p, .es-text-8870 a, .es-text-8870 h1, .es-text-8870 h2, .es-text-8870 h3, .es-text-8870 h4, .es-text-8870 h5, .es-text-8870 h6, .es-text-8870 ul, .es-text-8870 ol, .es-text-8870 li, .es-text-8870 span, .es-text-8870 sup, .es-text-8870 sub, .es-text-8870 u, .es-text-8870 b, .es-text-8870 strong, .es-text-8870 em, .es-text-8870 i { font-size:22px!important } .es-text-5607 .es-text-mobile-size-18, .es-text-5607 .es-text-mobile-size-18 * { font-size:18px!important; line-height:150%!important } }
  @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
  </style>
   </head>
   <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
    <div dir="ltr" class="es-wrapper-color" lang="fr" style="background-color:#F6F6F6"><!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                  <v:fill type="tile" color="#f6f6f6"></v:fill>
              </v:background>
          <![endif]-->
     <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
       <tr>
        <td valign="top" style="padding:0;Margin:0">
         <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
           <tr>
            <td align="center" style="padding:0;Margin:0">
             <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
               <tr>
                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                 <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                   <tr>
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                     <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" style="padding:0;Margin:0;font-size:0"><img src="https://eiiuqkm.stripocdn.email/content/guids/CABINET_3f5f024fee314bed731076534f200d0be504160a8579b6db43d4d9396abdd7b4/images/logo_fond_blanc.png" alt="" width="200" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
         <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
           <tr>
            <td align="center" style="padding:0;Margin:0">
             <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
               <tr>
                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                 <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                   <tr>
                    <td align="left" style="padding:0;Margin:0;width:560px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="left" class="es-text-8870" style="padding:0;Margin:0"><h2 align="center" style="Margin:0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';mso-line-height-rule:exactly;letter-spacing:0;font-size:22px;font-style:normal;font-weight:normal;line-height:33px !important;color:#FFDA6F">Bonjour,</h2></td>
                       </tr>
                       <tr>
                        <td align="left" class="es-text-5607" style="padding:0;Margin:0"><h6 align="center" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333"></h6><h6 align="center" class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:22px;color:#333333">&nbsp;<span style="line-height:150% !important">Vous recevez ce message car vous avez demandé un code de vérification pour CampusConnect. Voici votre code : ${code}. Utilisez-le pour confirmer votre identité. </span></h6><h6 align="center" class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:22px;color:#333333"><span style="line-height:27px !important;font-size:18px">Cordialement</span><span style="line-height:150% !important">,</span></h6><h6 align="center" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333"></h6><h3 align="center" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#2D60B1" class="es-text-mobile-size-18">L'équipe CampusConnect</h3></td>
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