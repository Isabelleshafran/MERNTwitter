const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


// Private Auth Route 
router.get('/current', passport.authenticate('jwt', {session: false }), (req, res) => {
    res.json({
        id: req.user.id, 
        handle: req.user.handle, 
        email: req.user.email
    });
});

// Create User 
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Login User
router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors)
    }
    
    const handle = req.body.handle;
    const password = req.body.password; 

    User.findOne({handle})
        .then(user => {
            if(!user){
                errors.handle = 'user not found';
                return res.status(400).json(errors);
                // return res.status(400).json('user doesnt exist')
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {id: user.id, handle: user.handle};

                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 3600}, 
                            (err, token) => {
                                res.json({
                                    success: true, 
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.password = "Incorrect Password";
                        return res.status(400).json(errors);
                        // return res.status(400).json('wrong password')
                    }
                });
        });

});

module.exports = router;