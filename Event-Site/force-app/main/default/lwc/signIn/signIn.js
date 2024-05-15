import { LightningElement ,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import loginMember from "@salesforce/apex/AuthMember.loginMember"


// import static resources
import { loadScript } from 'lightning/platformResourceLoader';
import hash from '@salesforce/resourceUrl/HashPassword';


export default class SignIn extends LightningElement {
    
    userLoggedIn=false;
    @track isModalOpen = false;
    load='i'

    isLoading=true;

    userLoggedIn=false;

    
 connectedCallback()
 {
     loadScript(this, hash ).then(() => {
         this.loaded=true;
         console.log("static resource loaded")
     })
     .catch((err)=>{
       console.log('static resource not called' ,err)
     })
 }

    
    listenChild(event)
    {
        const output=event.detail;
        this.isModalOpen=output;
    }

    

    // class properties
    emailId;
     password;
     validEmail=false;
     hashPassword;

    // disableSignInBtn=true;

     //signIn btn class
    signInBtnClass='btn-disable auth-btn'



    check()
    {
        if(this.isLoading)
        {
            console.log(this.isLoading)
            return false;
        }
        else{
        return true;
        }
    }

    // modal methods

    openModal(e) {
        e.preventDefault()
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
      }
      closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
      }

//input handler
inputHandler(event)
{
    //for email
    if(event.target.name == 'email')
    {
this.setEmail(event)
    }

    //for password
    if(event.target.name == 'password')
    {
        
this.setPass(event)
    }


    if(!this.password != ''  && this.validEmail)
    {
        console.log('ok')
    }

        
} 

//bind email
setEmail(event)
{
   
    let target=event.target;
this.emailId=event.target.value.toLowerCase().trim()
let emailCheck = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.emailId);


// remove space

//invalid format of email
if(!emailCheck)
{
    
  target.setCustomValidity('Please enter a valid email address');
  this.validEmail=false;
}

// correct format
else{

target.setCustomValidity('');
this.validEmail=true;




}
}


// bind password
setPass(event)
{
    if(event.target.value == "")

{
    this.hashPassword=''
event.target.setCustomValidity("Please enter your password.")
}

else{
    this.password=event.target.value;
    event.target.setCustomValidity("");
    this.hashPassword=md5(this.password)
    if(this.validEmail)
    {
        
        this.signInBtnClass='auth-btn'
    
    }

}

}


//set cookie
// Set a Cookie
setCookie(cName, cValue, expDays) {
  // create cookie for 30 mins
/*
  var todayDate = new Date();
 var minutes = 30;
todayDate.setTime(todayDate.getTime() + (minutes * 60 * 1000));
const expires = "expires=" + todayDate.toUTCString();
document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
*/
      
let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
       document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";

}


//auth user 

    login(){

        this.isLoading=false

        this.load='c'
        // check if email id and password are not empty

        if(this.emailId == undefined  || this.password == undefined)
        {

            this.dispatchEvent(new ShowToastEvent({
    title: 'SignIn Error',
    message: 'Email Id or Password field is empty',
    variant: 'error'
}));



  
        }


        //field not empty
        else
        {
            //calling apex method
      loginMember({email:this.emailId, passwordString :this.password})
       .then((response)=>{

        this.isLoading=response
           // valid credentials
           if(response){
               console.log("login then res",response)

                   //show toast message success

                   this.dispatchEvent(new ShowToastEvent({
              title: 'SignedIn Successfully',
              message: 'Redirecting you to the home page...',
              variant: 'success'
          }));
     //   sessionStorage.setItem("loginId",this.emailId);



        //login using  cookies 


// setCookie login cookie for next 30 days
this.setCookie('BB-user', this.emailId, 30);




        

        // redirect the user to home page
       window.location.href="https://nagteamcelebration-developer-edition.ap27.force.com/MainPage/s/"



           }
           else{
               //show toast message error
               this.dispatchEvent(new ShowToastEvent({
                title: 'Login Error',
                message: 'Invalid email id or password',
                variant: 'error'
            }));
            console.log("Wrong Credentials");
           }
       })
       .catch((error)=>{
           console.log(error);
       })


        }
    

    }




    
  //clear form input
  clearFormInput()
  {
    
    this.emailId=this.password=this.rePassword=this.code=this.name=undefined;
    const inputs=this.template.querySelectorAll("lightning-input")
    inputs.forEach(formInput=>{
      formInput.value=undefined
      
    });
  }

}