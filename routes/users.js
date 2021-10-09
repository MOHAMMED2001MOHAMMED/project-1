var express = require('express');
var router = express.Router();
const User = require('../models/User')
const {check , validationResult, Result} = require('express-validator');
const { findOne } = require('../models/User');
const passport = require('passport')

/* GET users listing. */
router.get('/Suinup', function(req, res, next) {
  var MassgeError = req.flash('SuinupError')

  res.render('Suinup',{massges : MassgeError})
});
router.post('/Suinup',[
  check('email').not().isEmpty().withMessage('Please Enter Email'), 
  check('email').isEmail().withMessage('Please Enter validat Enail'),
  check('password').not().isEmpty().withMessage('Please Enter Password'),
  check('password').isLength({min : 5}).withMessage('Please Enter Password more than 5 char'),
  check('consarmPassword').custom((value , {req})=>{
    if(value !== req.body.password){
      throw new Error('Passwprd not qualse ConsarmPassword')
    }
    return true ;
  })
],(req , res , next)=>{
  const errors = validationResult(req);
  if(! errors.isEmpty()){
       console.log(errors.errors)

       var valdetorMassge = []
       for(var i = 0 ; i<errors.errors.length ; i++){
         valdetorMassge.push(errors.errors[i].msg)
       }
       req.flash('SuinupError',valdetorMassge)
       res.redirect('Suinup')
       
       return ;
      }
      next()
  } , passport.authenticate('local-Suinup' , {
    successRedirect : 'Suinin',
    failureRedirect : 'Suinup',
    failureMessage : true 
  })
 



)

router.get('/profile',(req , res  ,next)=>{
  res.render('profile')
})

router.get('/Suinin',(req , res ,next)=>{
  var MassgeError = req.flash('SuininError')
  res.render('Suinin' , {massges : MassgeError})
})

router.post('/Suinin', [
  
  check('email').not().isEmpty().withMessage('Please Enter Email'), 
  check('email').isEmail().withMessage('Please Enter validat Enail'),
  check('password').not().isEmpty().withMessage('Please Enter Password'),
  check('password').isLength({min : 5}).withMessage('Please Enter Password more than 5 char'),


],(req,res,next)=>{

  const errors = validationResult(req);
  if(! errors.isEmpty()){
       console.log(errors.errors)

       var valdetorMassge = []
       for(var i = 0 ; i<errors.errors.length ; i++){
         valdetorMassge.push(errors.errors[i].msg)
       }
       req.flash('SuininError',valdetorMassge)
       res.redirect('Suinin')
       
       return ;
  }

next()

},passport.authenticate('local-Suinin',{
  successRedirect : 'profile',
  failureRedirect : 'Suinin' ,
  failureFlash    :  true
}))

module.exports = router;
