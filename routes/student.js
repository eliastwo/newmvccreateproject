let express = require('express');
const router = express.Router();
const http = require('http');
const bodyParser = require('body-parser');
const pool = require('../config/connection.js');
let pg = require('pg');
const path = require('path');
const fs = require('fs');

//Middleware for body parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded( { extended: false } ));

let dbName      = '';
let dbLoginName = '';
let dbLoginPswd = '';
let tableName   = 'MYTable4';
let column1Name = 'Table1Column1';
let column2Name = 'Table1Column2';
let isPrimary   = '';
let dataType    = '';
let isNull      = '';

router.get('/', function(req, res) {
   // res.json(student);
   res.render('students');
});

router.get('/done', function(req, res) {
   // res.json(student);
   res.render('done');
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

module.exports = router;