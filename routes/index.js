const router = require('express').Router();
const controller = require('../controllers');

//signUp routes
router.get("/sign-up", controller.getSignUpView);
router.post("/sign-up", controller.createUser);

module.exports = router;