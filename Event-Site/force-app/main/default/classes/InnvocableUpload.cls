public  class InnvocableUpload {
@InvocableMethod(label='Map profile image' description='Returns the list of account' category='Account')
  public static void  invoke() {
      
      try{
          
          List<ContentDocumentLink> docs=[Select contentdocumentid , linkedentityid from contentdocumentlink where LinkedEntityid = '0035j00000MMejeAAD'];
             
          if(docs.size() >0)
          {  

              
              List<ContentDistribution> cdList =new List<ContentDistribution>();
              
              for(ContentDocumentLink link  : docs)
              {
              for(ContentVersion cv : [Select id from contentversion where contentdocumentid =: link.ContentDocumentId ])
              {

              ContentDistribution cd =new ContentDistribution();
              cd.ContentVersionId=cv.Id;
              cd.PreferencesAllowViewInBrowser= true;

  Contact con=[Select id ,firstname from contact where id =: '0035j00000MMejeAAD'][0];
              con.FirstName='sp2';
              update con;
                  cdList.add(cd);
              
              }}
              
              insert cdList;
          }
      }
     catch(Exception e)
     {
                 messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
         mail.setToAddresses(new List<String> {'shubham.pandey@nagarro.com'});
         mail.setOrgWideEmailAddressId('0D25j000000KzduCAC');
                                     mail.setHtmlBody(e.getMessage());

                             
        List<Messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});


         system.debug(e.getMessage());
     }
      
  }
}