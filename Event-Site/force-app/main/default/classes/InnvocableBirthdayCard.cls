public class InnvocableBirthdayCard {

    
    @InvocableMethod(Label='Test')
    public static void  sendCard(List<Contact> cont)
    {
        
        Date d = System.today();
Datetime dt = (DateTime)d;
String dayOfWeek = 'Monday' ; //dt.format('EEEE');
        List<String> belatedBirthdayImageTags = new List<String>{'<img src="https://nagarroinc19-dev-ed.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j00000DLkVK&operationContext=DELIVERY&contentId=05T5j00000Vx25K&page=0&d=/a/5j000000dlsB/SwdlbKBVIncTB851MFgErJU2h4bv4Huu47f9JT0XG1U&oid=00D5j000006MzlW&dpt=null&viewId=">'};
List<String> birthdayImageTags=new List<String>{
'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000005KO0q&operationContext=DELIVERY&contentId=05T5j00000G4PZX&page=0&d=/a/5j000000DesX/Mu9Mon_9Nkv27MDBf1CPl2gMC6o3eDLt77HVv6co7qg&oid=00D5j000006MzlW&dpt=null&viewId=" alt="BirthdayImage">',

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbD0&operationContext=DELIVERY&contentId=05T5j00000Nh0i6&page=0&d=/a/5j000001LuL5/LDaVhbsv7lpK2gljC_nfME8VSTq6_FMyWy8wOpxMmos&oid=00D5j000006MzlW&dpt=null&viewId=" alt="BirthdayImage">',

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbD5&operationContext=DELIVERY&contentId=05T5j00000Nh0iB&page=0&d=/a/5j000001LuLA/YoRmQGOMBwjIHTqCotO4gNtDfRMlCVOMiyR2qhKUMEE&oid=00D5j000006MzlW&dpt=null&viewId=" alt="BirthdayImage">',

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbDK&operationContext=DELIVERY&contentId=05T5j00000Nh0iL&page=0&d=/a/5j000001LuLF/4bL369_ABRYuZCQN81xvunFIKZkDck5T3j_gxWfrygk&oid=00D5j000006MzlW&dpt=null&viewId=" alt="BirthdayImage">',

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbDP&operationContext=DELIVERY&contentId=05T5j00000Nh0iV&page=0&d=/a/5j000001LuLK/.CMUB5QO8cLbjQux3a5ObmM0Si_KlI3pLrTlR1nS3Xk&oid=00D5j000006MzlW&dpt=null&viewId=" alt="BirthdayImage">'
};


         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
                
        String body='<div style="background:#F0F8FF" ; padding:.5rem><br>';

        for(contact c : cont)
        {


            Integer randomNumber = Integer.valueof((Math.random() * birthdayImageTags.size()));
                
            body+='<div style="text-align:center">';
            body+='<h3 style="padding:.5rem; color:#000;font-size:25px;font-family:garamond">Wish you a very Happy Birthday! <br>' + c.Name + '</h3><br>';
               /*if(dayOfWeek == 'Monday'){
                  body+=belatedBirthdayImageTags[0];
               }
            else{
            body+=birthdayImageTags[randomNumber];
            }*/
            body+=birthdayImageTags[randomNumber];
            body+='</div>';
            
         
            body+= '<br><label style="font-size:12px">Regards,<br> Team BlackBaud</label></div>';
            
            

            mail.setToAddresses(new List<String>{c.Email});
            mail.setSubject('Happy Birthday!');
            mail.setHtmlBody(body);
            //mail.setCcAddresses(new List<String>{'dgnagarrosfdcdeveloper@nagarro.com'});
           mail.setCcAddresses(new List<String>{'dgblackbaud-sfdc@nagarro.com'});
            mail.setOrgWideEmailAddressId('0D25j000000KzduCAC');
            List<messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});

            

        }
    }
}