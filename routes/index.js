const express = require('express');
let router =  express.Router();



router.get('/', isLoggedIn, function(req, res){
  	res.render('pages/index');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
        next();
	}
	else{
        res.redirect("/users/login");
    }
}

console.log('got to index file');

module.exports = router;