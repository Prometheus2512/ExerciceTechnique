var express = require('express');
var router = express.Router();
var User= require('../models/user');
const axios = require('axios')
const request = require('request')

/* Send user credential to CDD API. */

router.post('/add', function(req, rez) {
  var u = new User();
  u.email= req.body.email;
  u.password=req.body.password;
  u.firstName=req.body.firstname;
  u.lastName=req.body.lastName;
  u.phoneNumber=req.body.phoneNumber;


request.post('https://dev.api.clacdesdoigts.com/v2/user',
{
  json: {
    email: req.body.email,
    password:req.body.password,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    phoneNumber:req.body.phoneNumber
  }
},
(error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
  rez.send(body)
}
)

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
  console.log(body)
  rez.send(body)
}
)

})
module.exports = router;
