var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator')
router.use(expressValidator())
var User= require('../models/user');
const request = require('request')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('user/add', {
		title: 'Add New User',
    email: '',
    password: '',
		firstName: '',
    lastName: ''		,
    phoneNumber: ''		,
    merr:null,
    msucc:null
	})
})
router.get('/log', function(req, res, next){	
	res.render('user/login', {
		title: 'login',
    username: '',
    password: ''
	})
})
router.post('/add', function(req, res, next){	
	req.assert('email', 'Name is required').isEmail()         //Validate name
	req.assert('password', 'Age is required').notEmpty()             //Validate age
  req.assert('firstName', 'A valid email is required').notEmpty()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {  

    var user = new User();
    user.email=  req.sanitize('email').escape().trim();
    user.password= req.sanitize('password').escape().trim();
    user.firstName= req.sanitize('firstName').escape().trim();
    user.lastName= req.sanitize('lastName').escape().trim();
    user.phoneNumber= req.sanitize('phoneNumber').escape().trim();
    console.log(user)
	
request.post('https://dev.api.clacdesdoigts.com/v2/user',
{
  json: {
    email: user.email,
    password:user.password,
    firstName:user.firstName,
    lastName:user.lastName,
    phoneNumber:user.phoneNumber
  }
},
(error, rez, body) => {
  if (error) {
    console.error(error)
    return
  }
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
  console.log(body.result);
  if(body.result=="error"){
    res.render('user/add', { 
      title: 'Add New User',

        email: req.body.email,
        password: req.body.password,
        firstName:  req.body.firstName,
        lastName:  req.body.lastName		,
        phoneNumber:  req.body.phoneNumber		,
        merr:body.data[0].message,
        msucc:null
      
  })
  }
}
)

	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		

        res.render('user/add', { 
            title: 'Add New User',
     
              email: req.body.email,
              password: req.body.password,
              firstName:  req.body.firstName,
              lastName:  req.body.lastName		,
              phoneNumber:  req.body.phoneNumber		,
              merr:"error",
              msucc:null
            
        })
    }
})

/* get token from CDD API. */
router.post('/login', function(req, rez) {
  let data = JSON.stringify({
    password: "Asdfasdf00",
    username:  "apitest001@clacdesdoigts.com"
})


request.post('https://dev.api.clacdesdoigts.com/v2/auth/token',
{
  json: {
    password: "Asdfasdf00",
    username:  "apitest001@clacdesdoigts.com"
  }
},
(error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  //console.log(`statusCode: ${res.statusCode}`)

  console.log(body.data.token)
  rez.cookie('auth',body.data.token);
  rez.send("ok")
}
)

})


module.exports = router;
