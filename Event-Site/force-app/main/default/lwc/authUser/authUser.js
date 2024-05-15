import { LightningElement } from 'lwc';


export default class AuthUser extends LightningElement {

  pageLoaded=false;

  // hide/show auth comp
  showAuth=true;

  renderedCallback()
  {
    this.pageLoaded=true;
 
  }

connectedCallback()
{
  



  // check if cookie already exist 
   if(this.getCookie('BB-user') != null)
   {

    console.log('logged in using cookies',this.getCookie('BB-user'))
    this.userLoggedIn=true;

this.showAuth=false;

     //redirect user to home site
  window.location.href="https://nagteamcelebration-developer-edition.ap27.force.com/MainPage/s/";

   
    
   }
   else{
     this.showAuth=true;
     console.log("cookie not set")
   }

  //
}



    // get cookie
    
    getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split('; ');
      let res;
      cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      })

      console.log("res",res)
      return res
    }
  


    //handle switch tab event
    handleSwitch(event)
    {
      const signInTab=this.template.querySelector(".signin-tab")
      signInTab.click()
    }


  





//qwerty
handleActive(event){


  //remove active state from other tabs
Array.from(event.currentTarget.parentElement.children).forEach((child) => {

if (child.classList.contains("slds-is-active")) {

  child.classList.remove("slds-is-active");

}

});

// set selected tab to active state

event.currentTarget.classList.add("slds-is-active");

//get current tab content class name
const currentTab=event.currentTarget.dataset.tabcontent;


// tab content

const tabsContent=this.template.querySelectorAll(".slds-tabs_default__content");
tabsContent.forEach((content)=>{
 //hide all contents
 
 content.classList.add("slds-hide")
 
})
this.template.querySelector("."+currentTab).classList.add("slds-show");
this.template.querySelector("."+currentTab).classList.remove("slds-hide");


}




}