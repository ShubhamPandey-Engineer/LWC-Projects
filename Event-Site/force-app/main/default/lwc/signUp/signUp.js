import { LightningElement ,api ,track} from 'lwc';

//record iwht account
import createMemberWithAccount from '@salesforce/apex/AuthMember.createMember';

import { createMember } from 'lightning/uiRecordApi';
import sendVerificationCode from '@salesforce/apex/AuthEmailHandler.sendVerificationCode';

import isUniqueEmail from '@salesforce/apex/AuthEmailHandler.isUniqueEmail';





import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// import static resources
import { loadScript } from 'lightning/platformResourceLoader';
import hash from '@salesforce/resourceUrl/HashPassword';



export default class SignUp extends LightningElement {
  
  @api recordId;

  @track documentId;


// form properties
 fName;
 lName;
 emailId;
 password;
 rePassword;
 code;
 email;
 hashPassword='qwerty'

 //signup btn disable or not(true-disable)
 formStatus=true;


// track email 
 codeSent=false;
codeNotSent=false;

 duplicateEmail=false;
 hideVerifyBtn=true;

 validEmail=false;

 //if email is verified
 isVerified=false;

 passwordVerified=false;


 // verification box
 verifyCode=false;

 verifyBtnLabel='Verify';
 signUpBtnLabel='Please fill all the details'
 signUpBtnClass='btn-disable auth-btn'


 //incorrect Vc 
 wrongCodeError=false;

 connectedCallback()
 {
   //loading static script
     loadScript(this, hash ).then(() => {
         this.loaded=true;
         console.log("static resource loaded")
        
     })
     .catch((err)=>{
       console.log('static resource not called' ,err)
     })
 }


//exceuted when page gets loaded
 renderedCallback()
 {
     //dispatch an event to parent auth component
     const event=new CustomEvent('signup',{detail:true})
     this.dispatchEvent(event)


/*
     
createMemberWithAccount({firstName :'sp', lastName : 'l', email :'shubhampandey@nagarro.com' , hashPassword :'d50b104487b0a023cbf05a0b1e6465ef' ,accountId :'0015j00000XsA8YAAV'})
.then((result) => {
  console.log({result})
})
.catch((err)=>{
  console.log({err})
})
     */
}

//send code (VC email)

sendCode()
{
  const code=this.generateCode();

//call apex verification email handler method
sendVerificationCode({userName:this.fName,emailId:this.emailId,code:code})
.then((response)=>{
  
  console.log('email status',response);

 this.codeNotSent=false;


 // if email was sent
 if(response)
 {
  //toast
  this.dispatchEvent(new ShowToastEvent({
    title: 'Email sent',
    message: `A verification code email is sent to ${this.emailId}`,
    variant: 'neutral'
}));


//show verification code  input box
this.verifyCode=true;



   // set session of 5 mins. mins for code 
   sessionStorage.setItem("code",code);

   //clear session after 5 mins.
   setTimeout(()=>{
sessionStorage.removeItem('code')
console.log('clear code')
   },120000)
 
 }



 //email not sent
 else{
  this.dispatchEvent(new ShowToastEvent({
    title: 'Email not sent',
    message: `Verification email was not sent.Please try after 24 hrs.`,
    variant: 'warning'
}));
 
 }
this.codeSent=response;
//verify btn label
this.verifyBtnLabel='Resend';


   
})

.catch((err)=>{
  // if email was not sent(show error)
  this.codeNotSent=true;
  this.codeSent=false;


  //show error toast
  this.dispatchEvent(new ShowToastEvent({
      title: 'Verification email not sent',
      message: 'Email not sent  Please try after 24 hrs.',
      variant: 'warning'
  }));
})
}

 

// generate verification code
generateCode()
{
  return Math.floor((Math.random()*1000000)+1);
}



// verify the code
verifyEmailAddress()
{
const realCode=sessionStorage.getItem('code');

// email verified successfully
if(realCode != null &&  this.code === realCode )
{
  //show success toast
   this.dispatchEvent(new ShowToastEvent({
       title: 'Email Verified',
       message: 'Your email address is verified.',
       variant: 'success'
   }));
  // disable verify btn with success

  this.verifyBtnLabel='Verified';
  console.log('emailverifited');
  this.isVerified=true;

  //hide code send label
  this.codeSent=false;
  this.hideVerifyBtn=true;

  //hide verify box
  this.verifyCode=false;

  sessionStorage.removeItem('code')

  //btn
  this.SignUpBtn();


  console.log(this.fName ,this.lName , this.isVerified , this.passwordVerified , this.password ,this.rePassword)

}
else{
  console.log('wrong code',this.code)

  this.wrongCodeError=true;

//this.isVerified=false;
}
}



 handleInputChange(event)
 {

event.preventDefault()

const getFName=event.target.name;

const getLName=event.target.name;
  const getEmailId=event.target.name;
  const getPassword=event.target.name;
 const getRePassword=event.target.name;
  const getCode=event.target.name;

// binding first name
  
  if(getFName === "fName")
  {
    this.fName=event.target.value
    console.log(this.fName)
   

    if(!this.fName){
      event.target.setCustomValidity('Please enter your first name');
    }else{
      event.target.setCustomValidity('');
    }
  }


  //binding lastname
  if(getLName === "lName")
  {
    this.lName=event.target.value
    console.log(this.fName)
   

    if(!this.lName){
      event.target.setCustomValidity('Please enter your last name');
    }else{
      event.target.setCustomValidity('');
    }
  }


  // check email format and unique email
  if(getEmailId === "Email")
  {
    
    let target=event.target;
this.emailId=event.target.value.toLowerCase();

//let emailCheck = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.emailId);

let emailCheck=/^[a-zA-Z0-9]+[.]?[a-zA-Z0-9]+?[@][nagarro]{7}[.][com]{3}$/.test(this.emailId)

this.verifyBtnLabel='Verify';
this.hideVerifyBtn=true;


// remove space
console.log("regex",emailCheck)
console.log(event.target.classList.contains("slds-has-error"))
//check invalid format of email
if(!emailCheck)
{
  target.setCustomValidity('Please enter a valid email address');
this.hideVerifyBtn=true;
this.isVerified=false;
}


// valid email address --> then check for uniqueness of email
else{

console.log('corret format')

//unofficial email id
if(!this.emailId.includes('nagarro'))
{
  target.setCustomValidity('Please enter a your work email id');
this.hideVerifyBtn=true;
this.isVerified=false;
}

//official email id
else{
  target.setCustomValidity('');

 // check unique email
isUniqueEmail({emailList:this.emailId}).then((res)=>{

   // if duplicate email (return false)
  if(!res)
  {
      target.setCustomValidity('User already registered with this Email Id.');
      this.hideVerifyBtn=true;

      //hide vc cont.
      this.verifyCode=false;

      this.codeSent=false;
      this.isVerified=false;

  }

  // unique email
  else{
    target.setCustomValidity('');
    this.hideVerifyBtn=false;
    
  }


}) // then close

.catch((errror)=>{
console.log("erroror in uniiii")
})
}
  }}

 // check password
  if(getPassword === "Password")
  {
    this.password=event.target.value

    let passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.password);
    
   let password2= "/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$/"
   console.log(passwordCheck)

    
  // if password is weak
    if(!passwordCheck)
    {
      event.target.setCustomValidity('Password must be Minimum eight characters, at least one letter, one number and one special character.');
  

    }

    // if strong
    else{
            event.target.setCustomValidity('');

            console.log(md5(this.password))
            console.log(md5(this.password))

    }
    

  }


  // check confirm password input
  if(getRePassword === "rePass")
  {
    this.rePassword=event.target.value
   // console.log("re pass:"+this.rePassword)
    if(!this.rePassword){
      event.target.setCustomValidity('Please Re-Enter the password');
    }
    else if(this.password != this.rePassword)
    {
      this.passwordVerified=false;
      event.target.setCustomValidity('Please Enter the same password');
    }
    else{
      //password & cpassword matches
      this.hashPassword=md5(this.password);
      this.passwordVerified=true;
      event.target.setCustomValidity('');
    }
   }

  if(getCode === "code")
  {
    this.code=event.target.value
    
    if(!this.code){
      event.target.setCustomValidity('Please Enter the code');
    }else{
      event.target.setCustomValidity('');
    }
  }


  //valid form details
    if(this.fName && this.lName  && this.isVerified && this.passwordVerified){
 
    this.SignUpBtn();
    }
 
 }
 

 //enable signUpBtn

 SignUpBtn()
 {
  if(this.fName && this.lName && this.isVerified && this.passwordVerified && this.password && this.rePassword){

    // console.log("Click btn")
     this.formStatus=false;
 
     // enable signup btn
 
 }
 else{
   this.formStatus=true;
 
 }
 }





 //register user
  handleSignUp()
  {

    // if non-verified email or different password or empty name
    if(!this.isVerified ||  !this.passwordVerified || !this.fName || !this.lName)
    {
      
    
      this.dispatchEvent(new ShowToastEvent({
        title: 'Signup failed',
        message: 'Please fill the correct details.',
        variant: 'error'
    }));

    }


    //create member record
    else{

//call apex method to create member record
console.log('create member')
createMemberWithAccount({firstName :this.fName, lastName : this.lName , email :this.emailId , passwordString : this.rePassword})
.then((result) => {
  
  //success
  if(result)
  {

    //success toast
    
    this.dispatchEvent(new ShowToastEvent({
      title: 'Successfully SignedUp',
      message: 'Please SignIn to continue...',
      variant: 'success'
  }));


  //send event to parent to switch tab to signin
  this.dispatchEvent(
    new CustomEvent('signupsuccess')
    )
        


  console.log('Member created ',JSON.stringify(result))
  this.clearFormInput();
  }

})
.catch((err) => {
  console.log(JSON.stringify(err))
});







    }

    
  }
  
  

  //clear form input
   clearFormInput()
  {


    this.verifyCode=false;

    //disble singnup btn
    this.formStatus=true;

    this.verifyBtnLabel='Verify';
    this.hideVerifyBtn=true;
    this.emailId=this.password=this.rePassword=this.code=this.lName=''
    this.isVerified=false;


    const inputs=this.template.querySelectorAll("lightning-input");
    const labelError=this.template.querySelectorAll("div.slds-form-element__help");
    console.log(labelError)

    // clear each input value
    inputs.forEach(formInput=>{
      formInput.value=null;
      
    });

    //clear  input error label
    labelError.forEach(forInput=>{
    forInput.innerHTML='';
    })

  }


}