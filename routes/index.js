var express = require('express');
var router = express.Router();
const passport = require("passport");//auth code

//Importing user schema
const UserModel = require("./users");//schema

// These two lines will allow user to login
const localStrategy = require("passport-local").Strategy;//auth code 
passport.use(new localStrategy(UserModel.authenticate()));//auth code

router.get("/",(req,res)=>{//This page contains register form
  res.render("index");
})

router.get("/login",(req,res)=>{//login page
  res.render("login");
})

router.post("/register",(req,res)=>{//auth code
  const userData = new UserModel({
    username: req.body.username,
    email: req.body.email,
  })
  UserModel.register(userData,req.body.password)
  .then(()=>{
    passport.authenticate("local")(req,res,()=>{
      res.redirect("/profile");
    })
  })
  .catch(err => {
    // console.error("Registration error:", err);
    res.redirect("/");
  });
});//auth code

router.post("/login", passport.authenticate("local", {//auth code
  successRedirect: "/profile",
  failureRedirect: "/login",
}));//auth code

router.get('/logout', function(req, res, next){//auth code
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});//auth code

function isLoggedIn(req,res,next){//auth code
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}//auth code

//Profile page will not open until you are logged in.
router.get("/profile",isLoggedIn,(req,res)=>{//auth code.
  const username = req.session.username;
  res.render("profile", { username: req.user.username });
})//auth code
//Route to render profile page (accessible only if logged in)


module.exports = router;
