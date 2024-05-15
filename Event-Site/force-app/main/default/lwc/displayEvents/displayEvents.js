import getMembers from '@salesforce/apex/GetData.getMembers';
import { LightningElement  , track } from 'lwc';

export default class DisplayEvents extends LightningElement {

    totalEvents=0;
    cardImg='';

    

    @track membersList=[];

    @track selectedMembers=[]

    B=false;
    E=false;
    A=false;
    W=false;


  

    selectedEvent='';
    selectedMonth=''
    disableEventChoice=true;
    eventChoiceTitle='Please select a month first'


    //event's select list options
    eventsSelectList=[
        {label:`Birthday's` , value:'Birthdays'},
        {label:`Marriage Anniversaries` , value:'Marriage Anniversary'},
        {label:`Engagement's` , value:'Engagements'},
        {label:`Work Anniversaries ` , value:'Work Anniversary'}


    ]


    
    //month's  list
    monthsList=[
        {label:'January'  , value :'1'},
        {label :'Febuary', value :'2'},
        {label :'March' , value :'3'},
        {label :'April' , value : '4'},
        {label :'May',value :'5'},
        {label :'June', value :'6'},
        {label :'July', value :'7'},
        {label :'August', value :'8'},
        {label :'September', value :'9'},
        {label :'October', value :'10'},
        {label :'November', value :'11'},
        {label :'December', value :'12'}


    ]



    // card event image

    cardImgList=[
        'https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008qQGx&operationContext=DELIVERY&contentId=05T5j00000OdUvf&page=0&d=/a/5j000000Yfkd/clOSEiKZ39KXHspCPaSZKOjJvtQ.2lKtXtoe9YscbI8&oid=00D5j000006MzlW&dpt=null&viewId=',
        
        //marriage anniversary img
        'https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbIo&operationContext=DELIVERY&contentId=05T5j00000Nh0tY&page=0&d=/a/5j000001LuM8/5OcID3b6dFMSAdXKhAuAttDW13TIl6AopyPsloKG4M0&oid=00D5j000006MzlW&dpt=null&viewId=',

        //engagement img
        'https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008Nc0X&operationContext=DELIVERY&contentId=05T5j00000Nh2XZ&page=0&d=/a/5j000001LuMX/8qn03UheEToAkmdQU1HtG.bI.hok0uthrAX_BReDN5c&oid=00D5j000006MzlW&dpt=null&viewId=',

        //work ann. img
        'https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbG0&operationContext=DELIVERY&contentId=05T5j00000Nh0nu&page=0&d=/a/5j000001LuLj/a4URMaafs6L209PW7k00pHY1IEYyUU1d8rvAOWClrGA&oid=00D5j000006MzlW&dpt=null&viewId='
         
    ]

    connectedCallback()
    {
        try{
        getMembers().then(res=>{

            this.membersList=res
        }).catch(err=>console.log(err))

        /*
        const dateFieldArr=['Marriage_Aniversary__c','Date_of_Joining__c' ,'Birthdate' , 'Engagement_Date__c'];

        this.membersList.forEach((member=>{

        for(let prop in member)
        {
           if(dateFieldArr.indexOf(prop) >=0)
           {
               member[prop]=member[prop].split('-').reverse().join('-');
           }
        }
    }))
    */

    }
    catch(err)
    {
        console.log(err)
    }
      

    }


    renderedCallback()
    {
        this.totalEvents=this.selectedMembers.length;
        
    }


    // return status of events
   get eventStatus()
    {
  return (this.selectedMembers.length === 0)?false:true;
    }



    //handle month change

     handleMonthEvent(event)
     {
        this.selectedMonth=event.target.value;


        // show event dropdown
        this.disableEventChoice=false
        this.eventChoiceTitle='Select a event '


        //set members
        this.setMembers(this.selectedEvent);
     }

    //handle event change
    showEvents(event)
    {
        this.selectedEvent = event.target.value;

     


     this.setMembers(event.target.value )
      
    
    }

    


    // set selected event members
    setMembers(eventName)
    {
        try{

        const currentMonth=parseInt(this.selectedMonth);



        //set birthday members
        if(eventName == 'Birthdays')
        {
            this.B=true;
            this.A=false;
            this.E=false;
            this.W=false

         this.cardImg= this.cardImgList[0]

           this.selectedMembers=this.membersList.filter((member)=>{
          
                //check if member birthdate and month ==== today's date & month
              const month =this.removeZero(member.Birthdate?.split("-").reverse()[1])

              return (month == currentMonth)



            }).sort((a,b)=>{
                let da = new Date(a.Birthdate).getUTCDate(),
        db = new Date(b.Birthdate).getUTCDate();
        console.log('o')

        return da-db;
            })

           
           const dateFormated=this.selectedMembers.some((member)=>{
              return   member.Birthdate.split('-')[0].length  != 4
            })

            //date not formated
        if(dateFormated  == false)
        {
 //reverse the date format
 this.selectedMembers.map((member)=>member.Birthdate=member.Birthdate?.split('-').reverse().join('-'));

}

        



            


        }


        else if(eventName == 'Marriage Anniversary')
        {
            this.A=true;
            this.B=false
            this.E=false;
            this.W=false
            
            try{
                this.cardImg=   this.cardImgList[1]

            this.selectedMembers=this.membersList.filter((member)=>{

            
                //check if member birthdate and month ==== today's date & month
              const month =this.removeZero(member.Marriage_Aniversary__c?.split("-").reverse()[1])
             return  (month == currentMonth)
             
       
           }).sort((a,b)=>{
            let da = new Date(a.Marriage_Aniversary__c).getUTCDate(),
    db = new Date(b.Marriage_Aniversary__c).getUTCDate();
    return da-db;
        })

           
         

           const dateFormated=this.selectedMembers.some((member)=>{
            return   member?.Marriage_Aniversary__c?.split('-')[0].length  != 4
          })

               //date not formated
        if(dateFormated  == false)
        {
        this.selectedMembers.map((member)=>member.Marriage_Aniversary__c=member.Marriage_Aniversary__c.split('-').reverse().join('-'))
        }

        }
        catch(err)
        {
            console.log(err)
        }

        
        }


        else if(eventName == 'Engagements')
        {
            this.E=true
            this.B=false
            this.A=false;
            this.W=false
            this.cardImg=   this.cardImgList[2]

            
        this.selectedMembers=this.membersList.filter((member)=>{
            //check if member birthdate and month ==== today's date & month
          const month =this.removeZero(member.Engagement_Date__c?.split("-").reverse()[1])
         return  (month == currentMonth)
   
        }).sort((a,b)=>{
            let da = new Date(a.Engagement_Date__c).getUTCDate(),
    db = new Date(b.Engagement_Date__c).getUTCDate();
    return da-db;
        })



        const dateFormated=this.selectedMembers.some((member)=>{
            return   member?.Engagement_Date__c?.split('-')[0].length  != 4
          })

                 //date not formated
        if(dateFormated  == false)
        {
        this.selectedMembers.map((member)=>member.Engagement_Date__c=member.Engagement_Date__c.split('-').reverse().join('-'))
        }
    }


        else if(eventName == 'Work Anniversary')
        {
            this.W=true
            this.B=false
            this.A=false;
            this.E=false;

            this.cardImg=   this.cardImgList[3]

            
        this.selectedMembers=this.membersList.filter((member)=>{
            //check if member birthdate and month ==== today's date & month
          const month =this.removeZero(member.Date_of_Joining__c?.split("-").reverse()[1])
         return  (month == currentMonth)
   



        }).sort((a,b)=>{
            let da = new Date(a.Date_of_Joining__c).getUTCDate(),
    db = new Date(b.Date_of_Joining__c).getUTCDate();
    return da-db;
        })


        const dateFormated=this.selectedMembers.some((member)=>{
            return   member?.Date_of_Joining__c?.split('-')[0].length  != 4
          })


                 //date not formated
        if(dateFormated  == false)
        {
       
        this.selectedMembers.map((member)=>member.Date_of_Joining__c=member.Date_of_Joining__c.split('-').reverse().join('-'))
        }

        
    }

}
catch(e)
{
    console.log(e)
}
    }






    //remove leading zero from date nd month 
    removeZero(data)
    {
        
        let regex = /^0+/;
        if(data != undefined)
        {
    return data.replace(regex, "");
        }
        else{
            return ;
        }
    }


}