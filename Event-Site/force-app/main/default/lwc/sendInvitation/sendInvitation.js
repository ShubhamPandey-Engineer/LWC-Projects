import { LightningElement,api, wire , track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getMembers from '@salesforce/apex/GetData.getRecepient';



import attachedEmail from '@salesforce/apex/SendInvitation.attachedEmail';
import nonAttachmentEmail from '@salesforce/apex/SendInvitation.nonAttachmentEmail';
import sendVerificationCode from '@salesforce/apex/AuthEmailHandler.sendVerificationCode';

export default class SendInvitation extends LightningElement {

    

   @track email={
    emailSubject:'',
    emailBody:'',
    hasAttachment:false
}


   @api memberId;
   showModal;

 
   

   @track recepientArr=[]
   recepientCount=0;
   title='Select a recepient'



radioValue=""

showMemberModal=false;


// datatable property
columns=[
    {label : 'Name' , fieldName: 'Name'},
     {label : 'Email' , fieldName : 'Email' }
]

@track data=[]





// wire get members
@wire(getMembers)
contactsDetail({data , error})
{
    if(data)
    {
       this.data= data.filter((member=>member.Email != this.getCookie('BB-user')))
        console.log('got',this.data)
    }
    else{
        console.log(error)
    }
}


get radioOptions()
{
    return [
        {label:'dgblackbaud-SFDC@nagarro.com' , value:'DG'},
        {label : 'Send Individually', value: 'Select members'}
    ]
}



  // get called when component is inserted into the dom
  connectedCallback()
  {
  }


  // handle recepient
  handleRecepient(event)
  {
      // select individual  members 
       if(event.target.value === 'Select members')
       {
           // open modal
           this.showMemberModal=true;
           this.recepientCount=0;
           this.title='Select a recepient'
           this.recepientArr=[]




       }
       //send mail to DG BlackBaud
       else{
           this.showMemberModal=false;
           this.recepientCount=1;
           //dgblackbaud-SFDC@nagarro.com
           this.title='dgblackbaud-SFDC@nagarro.com'
           this.recepientArr=[this.title]
       }
  }


//disable/enable recepient done btn
  get recepientDoneBtn()
  {

 return (this.recepientArr.length > 0)?false:true;
  }

  getSelectedContact(event)
  {
    const selectedRows = event.detail.selectedRows;

    //store recepient email
    this.recepientArr=selectedRows.map(contact => contact.Email)


    


}  


// get called when any property changes
renderedCallback()
{
    console.log("renderedd")
   
}





// hide the recepient
closeRecepientModal()
{
    this.showMemberModal=false;
}


//set the recepient email
setRecepient()
{
    //close modal
    this.showMemberModal=false;

    //set recepient  count 
    this.recepientCount=this.recepientArr.length;
    this.title=[...this.recepientArr]
    .join(',')
    console.log(this.title)
  
}


    //hide modal
    closeModal(event)
    {
        this.showModal=false;
    }



    handleModal()
{
    this.showModal=true;
}


//bind input
handleInput(event)
{
    try{
this.email[event.target.name]=event.target.value;
console.log(this.email)
    }
    catch(err)
    {
        console.err({err})
    }
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


      get fileUploaded ()
      {
        return   (this.email.hasAttachment)?true:false
      }

// handle attachment
handleAttachment(event)
{
    this.email.hasAttachment=true;

}



//handle form input
handleFormValidation()
{
    const inputField=[...this.template.querySelectorAll("lightning-input"), ...this.template.querySelectorAll("lightning-textarea"), ...this.template.querySelectorAll("lightning-radio-group")]
    
.reduce((validSoFar, inputField) => {
        inputField.reportValidity();
        return validSoFar && inputField.checkValidity();
        }, true);
        return inputField;
}


//method to send invitation
async sendInvitation(event)
{ 

    // validate form
    this.handleFormValidation()


    // check for valid recepient
    if(this.recepientArr.length == 0 || this.handleFormValidation() == false)
    {
  // show pop-up error
  this.dispatchEvent(new ShowToastEvent({
      title: 'Error',
      message: 'Required fields are empty or recepients are not selected',
      variant: 'error'
  }));
    }


    else{
    // send email
    
 try{

    // email with attachment
    if(this.email.hasAttachment)
    {
       await attachedEmail({  recepientList : this.recepientArr  ,recordId : this.memberId , emailSubject : this.email.emailSubject , emailBody : this.email.emailBody , senderEmailId: this.getCookie('BB-user')}).then((res)=>{
        console.log(res)
  

        //Invitation sent
        if(res)
        {
this.dispatchEvent(new ShowToastEvent({
    title: 'Invitation Sent',
    message: 'Your Invitation is sent',
    variant: 'success'
}));
this.closeModal()

//clear form
this.clearForm();
        }

        //not sent
        else{

        }
    }).catch((err)=>{
        this.dispatchEvent(new ShowToastEvent({
            title: 'Failed to sent Invitation',
            message: 'Your Invitation is not sent',
            variant: 'error'
        }));
        console.log({err})
}
    )
    }

 // email with attachment
    else{
   
     await   nonAttachmentEmail({  recepientList : this.recepientArr  , emailSubject : this.email.emailSubject , emailBody : this.email.emailBody , senderEmailId :this.getCookie('BB-user') }).then((res)=>{
sendVerificationCode({emailId:'shubham.pandey@nagarro.com',code:'45555'}).then(d=>console.log('ok')).catch(err=>console.log(err))
      
            //mail sent
            if(res)
            {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Invitation Sent',
                    message: 'Your Invitation is sent',
                    variant: 'success'
                }));
                this.closeModal();


                this.clearForm()
            }

            // not sent
            else{
                console.log({res})

                this.dispatchEvent(new ShowToastEvent({
                    title: 'Failed to sent Invitation',
                    message: 'Your Invitation is not sent',
                    variant: 'error'
                }));
            
            }
        })
        .catch((err)=>{
            console.log({err})
        })
        

    }

}





    catch(err)
    {
        console.log({err})
    }
    
    }
}




//clear form inputs
clearForm()
{
    [this.template.querySelector("lightning-input"), this.template.querySelector("lightning-textarea")].forEach((input)=>{


        input.value=''
    })

this.recepientCount=0;
this.recepientArr=[]
this.email={}
this.title=''
}

}