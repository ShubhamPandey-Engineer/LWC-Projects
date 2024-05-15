public without sharing class SendInvitation {
    public SendInvitation() {

    }

   

    // Org email id
 public  static String orgWideAddressEmailId='0D25j000000KzduCAC';
 
// public  static String orgWideAddressEmailId='0D25j000000TNizCAG';
 public  static String orgWideAddressEmailIdGmail='0D25j000000PBemCAG';






    // no attachment  email 
    @AuraEnabled()
    public static Boolean nonAttachmentEmail(List<String> recepientList , String emailSubject ,string emailBody ,string senderEmailId )
    {
      
  

                                          Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();


try{
                                             //set html email body


    string body='<div style="background : rgb(217, 226, 226);word-spacing:7px"> <p style="font-size: 14px;word-spacing:3px;line-height:5px">';
    body+= emailBody + '</p>';
    body+='<br><div style="text-align:center"><b > This email was sent by ' + senderEmailId + '</b></div>';

    body+= '</div>';
  

        
    mail.setToAddresses(recepientList);
    mail.setCcAddresses(new List<String>{senderEmailId});
    

    mail.setSubject(emailSubject);
    mail.setHtmlBody(body);





//mail.setSenderDisplayName('Shubham Pandey');
    mail.setOrgWideEmailAddressId(SendInvitation.orgWideAddressEmailId);
    List<messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
    

    return true;

            }  
        catch(Exception e)
    {
        return false;
    }      }





     // email with attachment
     
       @AuraEnabled()
        public static Boolean attachedEmail(List<String> recepientList ,Id recordId, String emailSubject ,string emailBody  , string senderEmailId)
        {
            List<id> ContentDocumentids = new List<id>();

            for(contentDocumentLink CDLink : [SELECT LinkedEntityid, ContentDocumentid FROM contentDocumentLink WHERE LinkedEntityid=:recordId])
           {
              ContentDocumentids.add(CDLink.ContentDocumentid);  
           }
       
       /* GET Data for the image */
       ContentVersion cv = [SELECT title,PathOnClient, FileType,
                                                   versiondata 
                                             FROM contentversion 
                                             
                                             WHERE ContentDocumentId IN :ContentDocumentids  order by lastmodifieddate desc limit 1
                                              ];


                                              //send email


                                              Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                                              Messaging.Emailfileattachment efa1 = new Messaging.Emailfileattachment();


try{
                                                 //set html email body
     
    string body='<div style="background :  rgb(217, 226, 226);"> <p style="font-size: 14px;word-spacing:3px;line-height:4px">';
    body+= emailBody + '</p>';
    body+='<br><div style="text-align:center"><b > This email was sent by ' + senderEmailId + '</b></div>';
    body+= '</div>';
  

            
        mail.setToAddresses(recepientList);


        mail.setSubject(emailSubject);
        mail.setHtmlBody(body);
        mail.setCcAddresses(new List<String>{senderEmailId});
        efa1.setBody(cv.versionData);
        efa1.setFileName(cv.pathonClient);
    
        mail.setFileAttachments(new Messaging.EmailFileAttachment[] {efa1});





        mail.setOrgWideEmailAddressId(SendInvitation.orgWideAddressEmailId);
        List<messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
        

        return true;

                }  
            catch(Exception e)
        {
            System.debug(e.getMessage());
            return false;
        }      }
    
    
}