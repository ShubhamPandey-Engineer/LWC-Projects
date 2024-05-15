public without sharing class AuthEmailHandler {

   AuthEmailHandler(){

    }
    
    // authenticator
  public  static String orgWideAddressEmailId='0D25j000000KzduCAC';

//DC emailID
  // static String orgWideAddressEmailId='0D25g000000fyjgCAA'


  


  
    // check unique email address
    @AuraEnabled
    public static Boolean isUniqueEmail(List<string> emailList){
        try {
            
            List<Contact> duplicateList=[Select email from Contact where email =: emailList limit 1];
            System.debug(duplicateList);
            if(duplicateList.size() >0)
            {
                return false;
            }
          return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    // send verification code
    @AuraEnabled
    public static Boolean sendVerificationCode(List<string> emailId , String  code){
        Messaging.reserveSingleEmailCapacity(1);
        try{


        messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
        


        String subject='Confirm your email address  | SignUp';


        //set html email body
        string body='<div style="background :rgb(217, 226, 226) " > <div style="background:#13294B ; text-align : center ; font-size : 16px ; font-weight: bolder">Confirm your email address</div>';
        body+='<p style="font-size:12px">Please use the below verification code to verify your email address.<br><br>';
        body+='<b style="font-size:14px">Verification code : ' + code   + '</b><br>'; 
        body+='Verification code expires after 2 minutes.</p><br>';
  


        mail.setToAddresses(emailId);
        mail.setSubject(subject);
        mail.setBccSender(false);
        mail.setHtmlBody(body);

        mail.setOrgWideEmailAddressId(AuthEmailHandler.orgWideAddressEmailId);
       List<Messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
       system.debug(result[0].isSuccess());
        return result[0].isSuccess();
      }
        catch (exception e){
          
          System.debug('email vc exception'+e.getMessage());
            return false;
        }
    }





    @AuraEnabled
    public static Boolean passwordChangeVC(List<string> emailId , string code){
      Messaging.reserveSingleEmailCapacity(1);
      try{

System.debug(emailId);
      messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
      


      String subject='Verification Code | Reset password';


      //set html email body
      string body='<div style="background : rgb(217, 226, 226); " > <div style="background:#13294B ; text-align : center ; font-size : 16px ; font-weight: bolder">Reset Password Request </div>';
      body+='<p style="font-size:12px ">Please use the below verification code to verify your email address.<br><br>';
      body+='<b style="font-size:14px">Verification code : ' + code   + '</b><br>'; 
      body+='Verification code expires after 2 minutes.</p><br>';

      mail.setToAddresses(emailId);
      mail.setSubject(subject);
      mail.setHtmlBody(body);
      mail.setBccSender(false);
      mail.setOrgWideEmailAddressId(AuthEmailHandler.orgWideAddressEmailId);
      mail.setOptOutPolicy('SEND');
      // mail.setEntityAttachments(files);
     List<Messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
     system.debug(result[0]);

     system.debug(result[0].isSuccess());
      return result[0].isSuccess();
    }
      catch (exception e){
        system.debug('passvc exception '+e.getMessage());

          return false;
      }
    }














}