const express = require('express');
const router = express.Router();
const {mid} = require('../middleware/mdw')
const {verifyAuth} = require('../middleware/auth')
const {home, about,details} = require('../controllers/users');

const {signup} = require('../controllers/signup');
const {Login} = require('../controllers/userLogin');
const {forgotPass} = require('../controllers/forgotPass');
const {resendOTP} = require('../controllers/resendOtp');
const {verifyOtp} = require('../controllers/verifyOtp');
const {resetPassword} = require('../controllers/RESET');

// user profile
const {updateProfile} = require('../controllers/updateProfile');
const {passwordChange} = require('../controllers/changePassword');
const {profile} = require('../controllers/profile')
// const {profileUpload} = require('../controllers/profilePicture')
const {updateProfilePhoto} = require('../controllers/updateprofilePhoto')
const {userName} = require('../controllers/userName')
const {Logout} = require('../controllers/logout');
// communities
const {communitiesJoin} = require('../controllers/communities');
const {allCommunities} = require('../controllers/allCommunities');
const {communitiesJoined} = require('../controllers/myJoinedCommunity');
//search
const {coursesSearch} = require('../controllers/coursesSearch');
const {commSearch} = require('../controllers/communitySearch');
const {sysSearch} = require('../controllers/search')
//subscribe and about us
const {contact} = require('../controllers/aboutUs');
const {subscribe} = require('../controllers/subscribe');
//courses
const {mycourses} = require('../controllers/mycourses');
const {courses} = require('../controllers/courses');
const {allCourses} = require('../controllers/allCourses')
//lessons
const {allLessons} = require('../controllers/allLessons')
const {getUserLessons} = require('../controllers/lessonsperCourse')
const {getcourseLessons} = require('../controllers/courseLessons')
//settings
const {updateSettings} =require('../controllers/settings')


router.get('/',home)
router.get('/details',verifyAuth,details)//local database
router.post('/signup',signup)// local database 
router.post('/login',Login)// local database
router.post('/forgotPass',forgotPass)// local database
router.put('/resendOtp',resendOTP)
router.post('/verifyOtp',verifyOtp)
router.put('/passwordReset',resetPassword)//local database
// user profile
router.put('/updateProfile',verifyAuth,updateProfile)
router.get('/profile', verifyAuth,profile)
router.post('/updateProfilePhoto', verifyAuth,updateProfilePhoto)
router.post('/addUserName', userName)
// router.put('/addprofileUpload', verifyAuth,profileUpload)
router.post('/passwordChange',passwordChange)//local database
router.post('/Logout',verifyAuth,Logout)
//search
router.get('/search', coursesSearch)
router.get('/commSearch', commSearch)
router.get('/allsearch', sysSearch)
//subscribe and about us
router.post('/contact',contact)// local database
router.post('/subscribe',subscribe)
//courses
router.post('/mycourses',verifyAuth,mycourses)// local database
router.get('/courses',verifyAuth,courses)
router.get('/fetchCourses',allCourses)
//lessons
router.get('/allLessons', allLessons)
router.get('/getlessonsperCourse', verifyAuth,getUserLessons)
router.get('/getcourseLessons', getcourseLessons )
//communities
router.post('/joinCommunity', verifyAuth,communitiesJoin)
router.get('/fetchCommunities', allCommunities)
router.get('/communitiesJoined', verifyAuth,communitiesJoined)
//settings
router.put('/updateSettings',verifyAuth,updateSettings)

module.exports= {router};
