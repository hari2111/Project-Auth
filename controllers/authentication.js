//logic part passed to router
var jwt =require('jwt-simple');
var User=require('../models/user');
var config=require('../config');

function tokenForUser(user){
	var timestamp=new Date().getTime();
	return jwt.encode({sub:user.id,iat:timestamp},config.secret);
}
module.exports.signin=function(req,res,next){
	res.send({token:tokenForUser(req.user)});
}
module.exports.signup=function(req,res,next){
	var email=req.body.email;
	var password=req.body.password;
	if(!email || !password){
		return res.status(422).send({error:'you must provide email and password'});
	}
	//see if a user exist
	User.findOne({email:email},function(err,existingUser){
		if(err){return next(err);}
		if(existingUser){
			return res.status(422).send({error:"email exist"});
		}
		var user=new User({
			email:email,
			password:password
		});
		user.save(function(err){
			if(err) { return next(err); }
				res.json({token: tokenForUser(user)});
		});

	});

}