const express = require('express');
const { signUp, signIn, forgotPassword, confirmCode, confirmCodeForgot, newPassword, completeProfile} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgot-password', forgotPassword);
router.post('/confirm-code', confirmCode);
router.post('/confirm-code-forgot', confirmCodeForgot);
router.post('/new-password', newPassword);
router.post('/complete-profile', upload.single('profileImage'), completeProfile);

module.exports = router;
