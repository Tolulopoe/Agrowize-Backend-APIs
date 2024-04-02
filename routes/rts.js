const express = require('express');
const router = express.Router();
const {mid} = require('../middleware/mdw')
const {verifyAuth} = require('../middleware/auth')
const {home, about,details} = require('../controllers/users');

const {signup} = require('../controllers/signup');
const {login} = require('../controllers/graceLogin');
// const {forgotPassword} = require('../controllers/forgotPasSword');
const {forgotPass} = require('../controllers/forgotPass');
const {resetPassword} = require('../controllers/RESET');
const {updateProfile} = require('../controllers/updateProfile');
const {passwordChange} = require('../controllers/changePassword');
const {contact} = require('../controllers/aboutUs');
const {verifyOtp} = require('../controllers/verifyOtp');
// const {insertCus} = require('../controllers/customerControl')

router.get('/',home)
router.get('/login',login)// local database
// router.get('/register',insertCus)//clever cloud access
router.post('/signup',signup)// local database 
// router.post('/forgotPassword',forgotPassword)// local database
router.post('/forgotPass',forgotPass)// local database
router.post('/passwordReset',resetPassword)//local database
router.post('/verifyOtp',verifyOtp)
router.put('/updateProfile',updateProfile)//local database
router.put('/passwordChange',passwordChange)//local database
router.get('/details',verifyAuth,details)//local database
router.post('/contact',contact)// local database
module.exports= {router};