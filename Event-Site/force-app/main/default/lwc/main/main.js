import { LightningElement ,track ,api} from 'lwc';



import checkField from '@salesforce/apex/GetData.checkMemberUpdate'

export default class Main extends LightningElement {


  @track loggedInUser={}
  showUpdateModal=false;





  renderedCallback()
  {
 

  }
   @api userLoggedIn=false;

    userId=''
    memberRecordId=''




    connectedCallback()
    {


// check if  cookie exist
 if(this.getCookie('BB-user') != null)
 {
   this.userLoggedIn=true
   this.userId=this.getCookie('BB-user');

  
   //call apex to check update fields
  checkField({emailId :this.userId}).then((data)=>{
  this.memberRecordId=data.Id;
  this.InfoUpdated=this.loggedInUser.DetailUpdated__c
  this.loggedInUser=data

  //console.log('logged',this.loggedInUser)

setTimeout(() => {
  //if detail is not updated
  this.showUpdateModal=!this.loggedInUser.DetailUpdated__c
console.log(`show update modal on login`,data)


}, 2000);

}
)
.catch((err)=>{
  console.log('update modal',err)
})




   console.log('logged in using cookies',this.getCookie('BB-user'))
console.log("welcome user")

 }

 //unauthenticated user
 else{

  //redirect to auth site

window.location.href='https://nagteamcelebration-developer-edition.ap27.force.com/auth/s/'



   console.log("cookie not set")
 }

     
    }
 



    //handle child event
    handleCustomEvent(event) {
  

      //calling child compoent method
      this.template.querySelector("c-display-members").loadContacts();
  
  
      
      }



      

//close modal method
closeModal(event)
{
  console.log('close')
  this.InfoUpdated=true;
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
  
    

   
      
  //profile menu
  showProfileMenu(event)
  {
   const profileBtn=this.template.querySelector(".profile-btn");
      profileBtn.classList.toggle('toggle-profile')

    const menuContainer=this.template.querySelector(".profile-menu")
    menuContainer.classList.toggle('slds-hide')
  }

    
  
    logout(){
sessionStorage.removeItem('loginId')


//clear cookie 
this.clearCookie('BB-user');

//console.log(sessionStorage.getItem("loginId"))

//redirect user to auth site
window.location.href="https://nagteamcelebration-developer-edition.ap27.force.com/auth/s/"

    }



    handleTabs(event){

        //remove active state from other tabs
const tabs=this.template.querySelectorAll(".home-tab_btn");
console.log(tabs)
tabs.forEach((currentTab)=>{
        currentTab.classList.remove("active-tab");
})
 



// set selected tab to active state



    event.currentTarget.classList.add("active-tab");



    //get current tab content class name

    const currentTabContent=event.currentTarget.dataset.tab;
console.log({currentTabContent})



    // tab content

   const tabsContent=this.template.querySelectorAll(".home-tab_content");

   tabsContent.forEach((content)=>{

       //hide all contents

       

       content.classList.add("slds-hide")

       

   })

   this.template.querySelector("."+currentTabContent).classList.add("slds-show");

   this.template.querySelector("."+currentTabContent).classList.remove("slds-hide");




}


  
// toggle menu method
toggleMenu(event)
{
  event.target.classList.toggle("menu-toggle_btn")
  event.target.classList.toggle("toggle-arrow")


  

  const tabsContainer=this.template.querySelector(".site-tabs_container")
  tabsContainer.classList.toggle("hide-menu")
 // tabsContainer.style.display='block'
}

}