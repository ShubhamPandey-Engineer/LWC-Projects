public  class MapContactProfileImage {
    
  public static void linkContactImage()
  {

       
      
      try{
             messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
         mail.setToAddresses(new List<String> {'shubham.pandey@nagarro.com'});
         mail.setOrgWideEmailAddressId('0D25j000000KzduCAC');
                                     mail.setHtmlBody('o');

                             
        List<Messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});


          Map<Id,contact> contactMap=new Map<id,Contact>([Select id from contact]);
          List<Contact> toUpdate=[Select id from contact ];

          
          List<ContentDocumentLink> docs=[Select contentdocumentid , linkedentityid from contentdocumentlink where LinkedEntityid =: contactMap.keyset() ];
             
          if(docs.size() >0)
          {  

              
              List<ContentDistribution> cdList =new List<ContentDistribution>();
               List<Contact> updateContact =new List<Contact>();

              
              for(ContentDocumentLink link  : docs)
              {
              for(ContentVersion cv : [Select id from contentversion where contentdocumentid =: link.ContentDocumentId ])
              {

              ContentDistribution cd =new ContentDistribution();
                  cd.Name='new image';
                  
              cd.ContentVersionId=cv.Id;
              cd.PreferencesAllowViewInBrowser= true;

  
                  cdList.add(cd);
              
              }
                  
                  Contact cont =new Contact();
                  cont.Id=link.LinkedEntityId;
                  cont.Profile_Image__c=[Select id from contentDistribution where Id =: cdList ][0].COntentDownloadUrl;
                  
                  updateContact.add(cont);
                  system.debug(cont);
             
               
                  
                  
                
                  
              
              }
              
               insert cdList;

              update updateContact;
          }
      }
     catch(Exception e)
     {
                /* messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
         mail.setToAddresses(new List<String> {'shubham.pandey@nagarro.com'});
         mail.setOrgWideEmailAddressId('0D25j000000KzduCAC');
                                     mail.setHtmlBody(e.getMessage());

                             
        List<Messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
*/

         system.debug(e.getMessage());
     }
}
}