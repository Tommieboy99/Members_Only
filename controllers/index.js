//sign-up middleware & controller

exports.getSignUpView = (req, res, next) => {
    res.render("sign-up");
}

const { body, validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcryptjs');
const userStorage = require('../storages/users')

const lengthErr = "must be between 1 and 60 characters.";

const validateUser = [
    body("firstName")
        .trim()
        .isLength({min: 1, max: 60}).withMessage(`First name ${lengthErr}`),

    body("lastName")
        .trim()
        .isLength({min: 1, max: 60}).withMessage(`Last name ${lengthErr}`),

    body("username")
        .trim()
        .isLength({min: 1, max: 60}).withMessage(`Username ${lengthErr}`)
        .custom(async (username) => {
            const exists = await userStorage.userExists(username);
            if (exists) {
                throw new Error('Username already in use');
            }

            return true;
        }),

    body("password")
        .isLength({min: 8}).withMessage(`Password must contain 8 characters`),

    body("confirmPassword")
        .custom((value, { req }) => {

            if (value !== req.body.password) {
                throw new Error('Password doesnt match')
            }
            
            return true;
        })
];

exports.createUser = [validateUser, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", { errors: errors.array() });
    }

    const { firstName, lastName, username, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10)
    await userStorage.createUser(firstName, lastName, username, hashedPassword);
    res.redirect("/sign-in");
}]

//Membership middleware & controller

exports.getJoinClubView = (req, res, next) => {
    res.render("join-club", { clubPasscode: process.env.CLUBPASSCODE});
}

const validatePasscode = [
    body("passcode")
    .isLength({max: 6}).withMessage('Cannot exceed 6 characters')
    .isNumeric().withMessage('Passcode only contains numbers(0-9)')
    .custom((value) => {
        if (value !== process.env.CLUBPASSCODE) {
            throw new Error('Incorrect passcode');
        } 

        return true;
    })
]

exports.createMembership = [validatePasscode, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("join-club", { errors: errors.array() });
    }

    await userStorage.createMembership(req.user.id)
    res.redirect("/");

} ] 

// signIn middleware & controller
const passport = require('passport');

exports.getSignInView = (req, res, next) => {
    res.render("sign-in");
}

exports.handleSignIn = passport.authenticate('local', {successRedirect: '/', failureRedirect: 'sign-up'})