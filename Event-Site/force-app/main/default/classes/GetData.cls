public without sharing class GetData {
    public GetData() {
    }

    @AuraEnabled
    public static List<Contact> getMembers(){
        try {

          return   [Select  firstName,lastName,name ,email , Profile_Image_URL__c	 ,birthdate , phone, Date_of_Joining__c, Board__c, Employee_ID__c,  Laptop_Number__c, OtherAddress, MailingCity, MailingCountry ,MailingPostalCode, MailingState,MailingStreet , Engagement_Date__c, Marriage_Aniversary__c , DetailUpdated__c  from Contact where Account.Name ='BlackBaud' order by Name];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }



    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRecepient(){
        try {

          return   [Select  Name , Email from Contact where Account.Name ='BlackBaud' order by name];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    
    //get  Detailupdate  field value
    @AuraEnabled
    public static Contact checkMemberUpdate(String emailId){
      try {
        List<Contact> cont=[Select firstName,lastName,name ,email ,birthdate , phone, Date_of_Joining__c, Board__c, Employee_ID__c,  Laptop_Number__c, OtherAddress, MailingCity, MailingCountry ,MailingPostalCode, MailingState,MailingStreet,    Engagement_Date__c, Marriage_Aniversary__c , DetailUpdated__c , Profile_Image_URL__c	  from contact where Email =:emailId  and  Account.Name='BlackBaud' limit 1];
       
        if(cont.size() >0)
        {
          return cont[0];
        }
        else{
          return null;
        }
      } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
        //return null;
      }
    }


    @AuraEnabled
    public static object updateMember(Contact memberInfo){
        try {
            

            Contact newContact=new Contact();

            newContact.FirstName=memberInfo.FirstName;
            newContact.LastName=memberInfo.LastName;
            newContact.Birthdate=memberInfo.Birthdate;
            newContact.Phone=memberInfo.Phone;
            newContact.Date_of_Joining__c=memberInfo.Date_of_Joining__c;
            newContact.Employee_ID__c=memberInfo.Employee_ID__c;
            newContact.Laptop_Number__c=memberInfo.Laptop_Number__c;
            newContact.Marriage_Aniversary__c=memberInfo.Marriage_Aniversary__c;
            newContact.Engagement_Date__c=memberInfo.Engagement_Date__c;
            newContact.Board__c=memberInfo.Board__c;
            newContact.Id=memberInfo.Id;
            newContact.MailingCity=memberInfo.MailingCity;
            newContact.MailingCountry=memberInfo.MailingCountry;
            newContact.MailingPostalCode=memberInfo.MailingPostalCode;
            newContact.MailingStreet=memberInfo.MailingStreet;
            newContact.MailingState=memberInfo.MailingState;
            newContact.Profile_Image_URL__c	 = memberInfo.Profile_Image_URL__c;
            Database.SaveResult result=Database.update(newContact);
            system.debug(result);

         //  return result.isSuccess(); 
        return newContact;
    //  return 'ok';



        } catch (Exception e) {
          return e.getMessage();
           // return false;
         //  return null;
         //   throw new AuraHandledException(e.getMessage());
           
        }
    }

    


    
}