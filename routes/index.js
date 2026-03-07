const router = require('express').Router();
const controller = require('../controllers');

//signUp routes
router.get("/sign-up", controller.getSignUpView);
router.post("/sign-up", controller.createUser);

//Membership routes
router.get("/join-club", controller.getJoinClubView);
router.post("/join-club", controller.createMembership);

module.exports = router;