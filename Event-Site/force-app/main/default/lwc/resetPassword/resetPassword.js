import { LightningElement ,track  ,api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendVerificationCode from '@salesforce/apex/AuthEmailHandler.passwordChangeVC';
import resetPassword from '@salesforce/apex/AuthMember.resetPassword';
import emailExist from '@salesforce/apex/AuthEmailHandler.isUniqueEmail';

// import static resources
import { loadScript } from 'lightning/platformResourceLoader';
import hash from '@salesforce/resourceUrl/HashPassword';





export default class ForgotPassword extends LightningElement {


    connectedCallback()
    {
        sessionStorage.clear();




        
    }
// UI properties
sendCodeCont=true;

checkCodeCont=false;

changePasswordCont=false;



//input properties
@track inputProperty={
    email:'',
    code:'',
    password:'',
    cPassword:'',
    hashPassword:'',
    sendCodeBtnLabel:'verify email',
    disableSendBtn:true,
    disableConfirmBtn:true,
    disableChangePasswordBtn:true
}

samePassword=false;
emailVerified=false;

//label errors

//display wrong vc error
vcError=false;


// display passwords label error
passwordLabelError=false;



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



//send the VC email btn
sendVerificationCode()
{
    console.log("send the cdoe")
    const code =this.generateCode();
    console.log(code);

    //code was set
    if(code)
    {


        this.inputProperty.code=code;
//if email exist in db
emailExist({emailList : this.inputProperty.email})
.then((res)=>{

    //email exist
    if(!res)
    {
console.log('exist')

//set session
sessionStorage.setItem('cp_code',code);

this.inputProperty.code=code;
//send the verification code email

console.log(this.inputProperty.code)
sendVerificationCode({emailId:this.inputProperty.email,code:this.inputProperty.code}).then((res)=>{
    console.log('email vc',res)

    if(res)
    {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Email sent',
            message: `A verification code email is sent to ${this.inputProperty.email}`,
            variant: 'neutral'
        }));
    }
})
.catch((err)=>{
    console.log(err)

    this.dispatchEvent(new ShowToastEvent({
        title: 'Verification email not sent',
        message: `Please try again`,
        variant: 'error'
    }));
})

//change send code btn label to resend
this.inputProperty.sendCodeBtnLabel='Resend code'


//show the verification input container
this.checkCodeCont=true;

    

    }

    //email does not exist
    else{
        this.dispatchEvent(new ShowToastEvent({
            title: 'Code not sent',
            message: 'No user found with this Email Id',
            variant: 'error'
        }));
console.log("not exist")
    }
})
    }

    else{
        console.log("code was not set")
        this.checkCodeCont=false;

    }

}



//check verification code btn
checkVerificationCode()
{
const realCode=sessionStorage.getItem('cp_code');

//correct VC 
if(realCode === this.inputProperty.code)
{
    console.log("user entered correct vc")

    this.dispatchEvent(new ShowToastEvent({
        title: 'Email Verified',
        message: '',
        variant: 'success'
    }));

    //email is verified
    this.emailVerified=true;

    //hide send VC container & check vc container
   this.sendCodeCont=this.checkCodeCont=false;

    //show change password container
    this.changePasswordCont=true;

    
    //hide wrong vc error label
    this.vcError=false;
}

else{
    console.log('wrong vc')

    //display wrong vc error label
    this.vcError=true;
}
}

//change password btn
changePassword()

{

}

// input handlers

//set email
    setEmail(event)
    {
        const value=event.target.value;

        let emailCheck = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

    // check for format
        if(value =='' || !emailCheck)
        {
            console.log("wrong format emial")

            event.target.setCustomValidity("Enter a valid email address.")
            //disable send btn
            this.inputProperty.disableSendBtn=true

    
this.inputProperty.email=value;
    }


    //correct format
    else{
        this.inputProperty.email=value;

        this.inputProperty.disableSendBtn=false 
        event.target.setCustomValidity("")


    }
}

    //set password
    setPassword(event)
    {
        const value=event.target.value;
        let passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);

        //valid password
        if(passwordCheck)
        {
            console.log('stong password')
            this.inputProperty.password=event.target.value;
            event.target.setCustomValidity("")


            if(this.inputProperty.password === this.inputProperty.cPassword)
            {
                 //enable change password button
          this.inputProperty.disableChangePasswordBtn=false;
            }
            else{
                //disable change password button
                this.inputProperty.disableChangePasswordBtn=true;


            }

        }
        else{
             //disable change password button
          this.inputProperty.disableChangePasswordBtn=true;

            console.log("type strng pass")
            event.target.setCustomValidity('Password must be Minimum eight characters, at least one letter, one number and one special character.');

        }

    }


      //set password
      setConfirmPassword(event)
      {
          const value=event.target.value;

          // value not null
          if(value != '')
          {

            event.target.setCustomValidity('');

            this.inputProperty.cPassword=event.target.value;

              // cpass == pass
            if(this.inputProperty.password === this.inputProperty.cPassword)
            {
                event.target.setCustomValidity('');


                 //enable change password button
          this.inputProperty.disableChangePasswordBtn=false;

           //convert to hash password
         //  this.inputProperty.hashPassword=md5(this.inputProperty.cPassword);
            }
            
            //passwords don't match
            else{

                event.target.setCustomValidity("Password don't match");

                 //disable change password button
          this.inputProperty.disableChangePasswordBtn=true;

                console.log('password dont match')

            }
          }
  // empty cpassword
          else{
            event.target.setCustomValidity("Password don't match");

            //disable change password button
     this.inputProperty.disableChangePasswordBtn=true;

          }
         
  
      }
  
    setCode(event)
    {
        this.inputProperty.code=event.target.value;
        const value=event.target.value;

        if(value!='')
        {
            this.inputProperty.code=event.target.value;
            event.target.setCustomValidity('');


        }
        else{
            //hide wrong vc error label
            this.vcError=false;
            event.target.setCustomValidity('Enter the Verification code.');

        }

    }



    //set new password
    setNewPassword()
    {
        //passwords  empty && are equal
      if((this.inputProperty.password !='' && this.inputProperty.cPassword != '') &&  this.inputProperty.password === this.inputProperty.cPassword)
      {
          //call imperative apex to update the password
          console.log(this.inputProperty.email)

          resetPassword({emailId:this.inputProperty.email , newPassword : this.inputProperty.password})
          .then((res)=>{

            if(res)
            {
              console.log('reset response',res)
              console.log("password changed")
              this.dispatchEvent(new ShowToastEvent({
                  title: 'Password Changed',
                  message: 'Your password is changed.',
                  variant: 'success'
              }));


              //close the modal
              this.closeModal();
            }

            else{
                // record not updated
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Password Not Changed',
                    message: 'No user registered with this EmailId.',
                    variant: 'error'
                }));
            }
          })
          .catch((err)=>{
              console.log('reset error',err)

              this.dispatchEvent(new ShowToastEvent({
                title: 'Password not Changed',
                message: 'Your password was not changed.Please try again.',
                variant: 'error'
            }));
          })
          
         

          this.passwordLabelError=false;


          //send email notification
      }

      //password don't match
      else{
          console.log("ener smae password")

          this.dispatchEvent(new ShowToastEvent({
            title: 'Password not changed',
            message: `Password don't match`,
            variant: 'failure'
        }));

        //show password label error
        this.passwordLabelError=true;;
      }

    }




    // create & dispatch event to close modal
      closeModal() {
        const event=new CustomEvent('close',{detail:false})
        this.dispatchEvent(event)
      }


    //generate random code
    // generate verification code
generateCode()
{
  return Math.floor((Math.random()*1000000)+1);
}
}