import express from 'express';
import { User, createUser, comparePassword, getUserByEmail, getUserById } from '../models/User';
import passport from 'passport';
import http from 'http';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

const router = express.Router();
const pool = require('../config/connection.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded( { extended: false } ));

//Variables for getting data from main website
let dbName      = '';
let dbLoginName = '';
let dbLoginPswd = '';
let tableName   = 'MYTable4';
let column1Name = 'Table1Column1';
let column2Name = 'Table1Column2';
let isPrimary   = '';
let dataType    = '';
let isNull      = '';

let LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res){
	res.render('pages/users');
});

router.get('/main', function(req, res) {
	// res.json(student);
	res.render('pages/students');
 });

router.get('/register', function(req, res){
  	res.render('pages/register');
});

router.post('/register', function(req, res){
	let name = req.body.name;
	let email = req.body.email;
	let password = req.body.password;
	let cfm_pwd = req.body.cfm_pwd;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Please enter a valid email').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('cfm_pwd', 'Confirm Password is required').notEmpty();
	req.checkBody('cfm_pwd', 'Confirm Password Must Matches With Password').equals(password);

	let errors = req.validationErrors();
	if(errors)
	{
		res.render('pages/register',{errors: errors});
	}
	else
	{
		let user = new User({
		name: name,
		email: email,
		password: password
		});
		createUser(user, function(err, user){
			if(err) throw err;
			else console.log(user);
		});
		req.flash('success_message','You have registered, Now please login');
		res.redirect('login');
	}
});

router.get('/login', function(req, res){
	console.log('client connected to server');
	res.render('pages/login');
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback : true
},
function(req, email, password, done) {
	getUserByEmail(email, function(err, user) {
		if (err) { return done(err); }
			if (!user) {
				return done(null, false, req.flash('error_message', 'No email is found'));
			}
			comparePassword(password, user.password, function(err, isMatch) {
				if (err) { return done(err); }
				if(isMatch){
					return done(null, user, req.flash('success_message', 'You have successfully logged in!!'));
				}
				else{
					return done(null, false, req.flash('error_message', 'Incorrect Password'));
				}
			});
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	getUserById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/users/login', failureFlash: true
	}), 
	function(req, res){
		req.flash('success_message', 'You are now Logged in!!');
		res.redirect('/');
	}
);

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_message', 'You are logged out');
	res.redirect('/users/login');
});


router.post('/api/data', (request, response) => {
    const postBody = request.body;

      dbName      = postBody.dbName;
      dbLoginName = postBody.dbLoginName;
      dbLoginPswd = postBody.dbLoginPswd;
      column1Name = postBody.column1Name;
      isPrimary   = postBody.column1IsPrimary;
      dataType    = postBody.Column1DataType;
      isNull      = postBody.Column1IsNull;

      console.log('The database name is: ' + dbName);
      console.log('The database login user name is:' + dbLoginName);
      console.log('The database user password is: ' + dbLoginPswd);
      console.log('The name of the column is: ' + postBody.column1Name);
      console.log('The value of is column primary: ' + postBody.column1IsPrimary);
      console.log('The column Data Type is: ' + postBody.Column1DataType);
      console.log('The value of can column be null: ' + postBody.Column1IsNull);
      response.send(postBody);

      pool.query("CREATE TABLE IF NOT EXISTS mySchema.dataBaseParams2 (id SERIAL PRIMARY KEY, dbName varchar(30), dbLoginname varchar(30), dbUserPswd varchar(30))", function(err,res) {
         if(err) {
            console.log(err);
         } else {
            console.log(res);
         }
      });

      pool.query(`INSERT INTO mySchema.dataBaseParams2 (dbName, dbLoginname, dbUserPswd) VALUES ('${dbName}', '${dbLoginName}', '${dbLoginPswd}')`);
      //pool.query("CREATE TABLE IF NOT EXISTS mySchema." + ${tableName} );
});

pool.query("CREATE TABLE IF NOT EXISTS mySchema." + tableName + "(" + column1Name +  " SERIAL PRIMARY KEY, " + column2Name + " varchar(30), T1Col3 varchar(30))", function(err,res) {
   if(err) {
      console.log(err);
   } else {
      console.log(res);
   }

   pool.query(`SELECT create_table_type1('${tableName}')`, function(err, res) {
      if(err) throw err;
      console.log(res);
   });

/*    pool.query(`ALTER TABLE ('${tableName}') ADD '${column1Name}' varchar(30)`, function(err, res) {
      if(err) throw err;
      console.log(res);
   }); */

});

/* const filePackageJSON  = '/mnt/c/Users/jeffc/code/project3/package.json';
const filemvcCBjs      = '/mnt/c/Users/jeffc/code/project3/mvcCB.js';
const dirRoutes        = '/mnt/c/Users/jeffc/code/project3/mynew_project/routes';
const dirViews         = '/mnt/c/Users/jeffc/code/project3/mynew_project/views';
const dirpartials      = '/mnt/c/Users/jeffc/code/project3/mynew_project/views/partials';
const dirConfig        = '/mnt/c/Users/jeffc/code/project3/mynew_project/config';
const fileConnjs       = '/mnt/c/Users/jeffc/code/project3/config/connection.js';
const fileStudentjs    = '/mnt/c/Users/jeffc/code/project3/routes/student.js';
const filestudentsejs  = '/mnt/c/Users/jeffc/code/project3/views/students.ejs';
const fileheaderejs    = '/mnt/c/Users/jeffc/code/project3/views/partials/header.ejs';
const filefooterejs    = '/mnt/c/Users/jeffc/code/project3/views/partials/footer.ejs';

if(!fs.existsSync(dirRoutes)) {fs.mkdirSync(dirRoutes)};
if(!fs.existsSync(dirViews)) {fs.mkdirSync(dirViews)};
if(!fs.existsSync(dirConfig)) {fs.mkdirSync(dirConfig)};
if(!fs.existsSync(dirpartials)) {fs.mkdirSync(dirpartials)};
fs.createReadStream(filePackageJSON).pipe(fs.createWriteStream('/mnt/c/Users/jeffc/code/project3/mynew_project/package.json'));
fs.createReadStream(filemvcCBjs).pipe(fs.createWriteStream('/mnt/c/Users/jeffc/code/project3/mynew_project/mvcCB.js'));

 fs.copyFile(filemvcCBjs, '/mnt/c/Users/jeffc/code/project3/mynew_project/mvcCB.js', function(err) {
   if(err) throw err;
   console.log('file copied successfully');
});

fs.copyFile(fileConnjs, '/mnt/c/Users/jeffc/code/project3/mynew_project/config/connection.js', function(err) {
   if(err) throw err;
   console.log('file copied successfully');
}); 

fs.copyFile(fileStudentjs, '/mnt/c/Users/jeffc/code/project3/mynew_project/routes/student.js', function(err) {
   if(err) throw err;
   console.log('file copied successfully');
});

fs.copyFile(filestudentsejs, '/mnt/c/Users/jeffc/code/project3/mynew_project/views/students.ejs', function(err) {
   if(err) throw err;
   console.log('file copied successfully');
});

fs.copyFile(fileheaderejs, '/mnt/c/Users/jeffc/code/project3/mynew_project/views/partials/header.ejs', function(err) {
   if(err) throw err;
   console.log('file copied successfully');
});

fs.copyFile(filefooterejs, '/mnt/c/Users/jeffc/code/project3/mynew_project/views/partials/footer.ejs', function(err) {
   if(err) throw err;
   console.log('file copied successfully');
}); */

export default router;