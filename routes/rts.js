const express = require('express');
const router = express.Router();
const {mid} = require('../middleware/mdw')
const {verifyAuth} = require('../middleware/auth')
const {home, about,details} = require('../controllers/users');

const {signup} = require('../controllers/signup');
const {Login} = require('../controllers/userLogin');
// const {Logout} = require('../controllers/logout');
// const {forgotPassword} = require('../controllers/forgotPasSword');
const {forgotPass} = require('../controllers/forgotPass');
const {resendOTP} = require('../controllers/resendOtp');
const {verifyOtp} = require('../controllers/verifyOtp');
const {resetPassword} = require('../controllers/RESET');
const {updateProfile} = require('../controllers/updateProfile');
const {passwordChange} = require('../controllers/changePassword');
const {subscribe} = require('../controllers/subscribe');

const {sysSearch} = require('../controllers/search');
// const {allsearch} = require('../controllers/allSearch');
const {contact} = require('../controllers/aboutUs');
const {mycourses} = require('../controllers/mycourses');
const {courses} = require('../controllers/courses');

// const {insertCus} = require('../controllers/customerControl')

router.get('/',home)
router.get('/details',verifyAuth,details)//local database
router.post('/signup',signup)// local database 
router.post('/login',Login)// local database
router.post('/forgotPass',forgotPass)// local database
router.put('/resendOtp',resendOTP)
router.post('/verifyOtp',verifyOtp)
router.post('/subscribe',subscribe)
router.put('/passwordReset',resetPassword)//local database
router.put('/updateProfile',updateProfile)//local database
router.post('/passwordChange',passwordChange)//local database
// router.post('/Logout',Logout)

router.get('/search', sysSearch)
// router.get('/allsearch', allsearch)
router.post('/contact',contact)// local database
router.post('/mycourses',mycourses)// local database
router.get('/courses',courses)

module.exports= {router};
