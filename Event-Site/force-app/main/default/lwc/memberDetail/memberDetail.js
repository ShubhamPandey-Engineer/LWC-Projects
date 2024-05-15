import { LightningElement  , api} from 'lwc';
import Contact from '@salesforce/schema/Contact';
import getMembers from '@salesforce/apex/GetData.getMembers';


export default class MemberDetail extends LightningElement {
    showMemberDetailModal = true;
    isloading = false;
name=Contact

//show/hide modal
showModal=true;

//store member detail
@api memberInfo={}



//return birthdate
get getBirthDate()
{
    return this.formatDate(this.memberInfo.Birthdate)
//return this.memberInfo.Birthdate?.split("-").reverse().join("-")
}






//return marriageanniversary date
get getMarriageAniversaryDate()
{
    return this.formatDate(this.memberInfo.Marriage_Aniversary__c)
//return this.memberInfo.Birthdate?.split("-").reverse().join("-")
}


//return engagement date
get getEngagementDate()
{
    return this.formatDate(this.memberInfo.Engagement_Date__c)
//return this.memberInfo.Birthdate?.split("-").reverse().join("-")
}



//return joining date
get getJoiningDate()
{
    return this.formatDate(this.memberInfo.Date_of_Joining__c)
//return this.memberInfo.Birthdate?.split("-").reverse().join("-")
}






//format date
formatDate(date)
{
    console.log(date)
   return  (date  != undefined) ? date.split("-").reverse().join("-") : ''

}

connectedCallback()
{
    this.shadowRoot=true;
    console.log('detail',this.memberInfo)
}
    closeModal()
    {

       this.showMemberDetailModal = false;
        const closeModalEvent=new CustomEvent("closememberdetail",{
            detail: this.showMemberDetailModal
        });
        this.dispatchEvent(closeModalEvent);
        

    }


    // get user image
    get displayuserImage(){
        return (this.memberInfo.Profile_Image_URL__c === undefined)?`https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7`:this.memberInfo.Profile_Image_URL__c
    }
}