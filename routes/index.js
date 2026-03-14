const router = require('express').Router();
const controller = require('../controllers');

//signUp routes
router.get("/sign-up", controller.getSignUpView);
router.post("/sign-up", controller.createUser);

//Membership routes
router.get("/join-club", controller.getJoinClubView);
router.post("/join-club", controller.createMembership);

//signIn routes
router.get("/sign-in", controller.getSignInView);
router.post("/sign-in", controller.handleSignIn);

//homepage routes
router.get("/", controller.getHomepageView)
router.get("/log-out", controller.getUserLogOut)
router.post("/message", controller.createMessage)

module.exports = router;