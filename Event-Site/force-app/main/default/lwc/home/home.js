import { LightningElement ,track } from 'lwc';

export default class Home extends LightningElement {
    @track isModalOpen = false;

    userLoggedIn=false;


    connectedCallback()
    {

      
// check if  cookie exist
 if(this.getCookie('BB-user') != null)
 {
   this.userLoggedIn=true
   console.log('logged in using cookies',this.getCookie('BB-user'))
console.log("welcome user")

 }

 //unauthenticated user
 else{

  //redirect to auth site

//window.location.href='https://my-workspace-developer-edition.ap27.force.com/auth/s/'

   console.log("cookie not set")
 }

        
       /* check login using session
        //welcome the user
        if(sessionStorage.getItem('loginId')!=null)
        {
            console.log("logged in")
          this.userLoggedIn=true;
          //  this.closeModal();
         //   window.location.href="https://myspace1b8-developer-edition.ap24.force.com";
        }

        // redirect the user to the auth site
        else{
         //   this.openModal();
            console.log("user not logged in")

          //  window.location.href='https://dev-workspace-developer-edition.ap24.force.com/siteTest'
        }

        */
    }
 


    
    // get cookie
    
    getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split('; ');
      let cookie;
      let res;
      cArr.forEach(val => {
        if (val.indexOf(name) === 0)
        { res = val.substring(name.length);
          return res
        }
      })

     
      return res
    }
  
    openModal() {
      // to open modal set isModalOpen tarck value as true
      this.isModalOpen = true;
    }
    closeModal() {
      // to close modal set isModalOpen tarck value as false
      this.isModalOpen = false;
    }



    //clear cookie

    
    clearCookie(cName) {
      
//delete the cookie with name BB-user
let date = new Date();
date.setTime(date.getTime() + (30 * 24 * 60 * 0 * 1000));
const expires = "expires=" + date.toUTCString();


document.cookie = cName + "=;"+ expires + "; path=/";

    }
  
    
  
    logout(){
//sessionStorage.removeItem('loginId')


//clear cookie 
this.clearCookie('BB-user');

//console.log(sessionStorage.getItem("loginId"))

//redirect user to auth site
//window.location.href="https://my-workspace-developer-edition.ap27.force.com/auth/s/"
    }
}