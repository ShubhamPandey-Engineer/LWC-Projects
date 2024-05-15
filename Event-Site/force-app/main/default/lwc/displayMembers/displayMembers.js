import { LightningElement ,api, track ,wire} from 'lwc';
import getMembers from '@salesforce/apex/GetData.getMembers';
export default class DisplayMembers extends LightningElement {
    //get all members
   @track allMembers=[]



   @track memberClone=[]

   


userName=""

    //loggedUserId
   @api loginId='';
   @api memberId=''

    //member  info
    memberInfo={}
    showMemberDetailModal = false;
    updateMemberDetailModal=false;
    showInvitationModal=false;
    isloading = false;
    showModal=false;


    //searched member
   searchedName;




//return search result 
get searchedResult()
{
    if(this.allMembers.length >0)
    {
        return 'data'
    }

    //no result
    else{
        return undefined;
    }
}





   
  // capture event from child comp.
    closeModal() {
        //hide detail & update componentP
        
        this.showMemberDetailModal = false;
        this.updateMemberDetailModal=false;
     
        this.showMemberDetailModal = false;
     
        this.showModal=false;
    }

//rendered callback
renderedCallback()
{
   
}


handleCustomEvent(event) {

//fetch new data
this.loadContacts();





}


connectedCallback(){
 this.loadContacts();
   
}




//handle  search input
handleSearch(event)
{
    const value=event.target.value



 
    //no search
    if(value =='')
    {
        //get all contacts
    }


    //display searched member
    else{
      
  //find member
  const memberExist=this.memberClone.filter((member)=>{

    //convert name to lowercase
      const memberName=member.Name.toLowerCase();
      
   return  memberName.startsWith(value.toLowerCase())
  })
  
  // if valid search
  if(memberExist != undefined)
  {
      //display member
this.allMembers=[...memberExist]
  }
// show no member found

else{
this.allMembers=[]


}



    }
}



//search bar clear on cross btn
clearSearch(event)
{
    //assign initial state to arr.
    this.allMembers=this.memberClone
}


//fetch all contacts
@api  async loadContacts()
{
    //apex to get all members
  await  getMembers().then((data)=>{
        //check logged in user
data.map((member)=>
{
 
   return (member.Email === this.loginId) ?member.enableUpdate=true : false 
})

   
   


   if(data.length==0){
console.log('No Member')

}else{
   data.forEach((contact=>{
    console.log(contact)
    contact.Profile_Image_URL__c = (contact.Profile_Image_URL__c === undefined) ?`https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7`:contact.Profile_Image_URL__c

           // contact = {...data,Profile_Image_URL__c : `https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7`}
          //contact =  {..., contact.Profile_Image_URL__c : `https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7`}

        
    }))
 console.log('ddd',this.allMembers)
 this.allMembers = data
 
   this.memberClone=[...this.allMembers]
   }


   
   }).catch((error)=>{
       console.log({error})
   })


}

// display member info
getMemberInfo(event)
{

    this.showModal=true;

    
    const memberId=event.currentTarget.dataset.id;

    //get action event name
    const actionName=event.currentTarget.dataset.name;


    //store member info 
    this.memberInfo=this.allMembers.find(member => member.Id === memberId);



    (actionName == "view")?this.showMemberDetailModal=true:this.updateMemberDetailModal=true;
    console.log('send',this.memberInfo)

}
}