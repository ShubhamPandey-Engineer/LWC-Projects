public class InnvocableMarriageAnniversaryCard {
    
    @InvocableMethod(Label='Test')
    public static void  sendCard(List<Contact> cont)
    {
         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
      
List<String>  marriageAnniversaryTags=new List<String>{
'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000005KRHt&operationContext=DELIVERY&contentId=05T5j00000G4aQs&page=0&d=/a/5j000000Dew0/OIyV0nuZ0Gw1uBsBbCuguDvsg3AV9OyRm9KYql9hYuI&oid=00D5j000006MzlW&dpt=null&viewId=">',

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbIj&operationContext=DELIVERY&contentId=05T5j00000Nh0tO&page=0&d=/a/5j000001LuM3/aOyOM2st82nqO5gluFJEfU3y7oiXjn3dWyt5Goowhkw&oid=00D5j000006MzlW&dpt=null&viewId=">',

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbIk&operationContext=DELIVERY&contentId=05T5j00000Nh0tT&page=0&d=/a/5j000001LuM4/zeFPpZNUiGEkuxl652KnzT4a1.tICiSrdPbamvfvg1I&oid=00D5j000006MzlW&dpt=null&viewId=">',

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbIo&operationContext=DELIVERY&contentId=05T5j00000Nh0tY&page=0&d=/a/5j000001LuM8/5OcID3b6dFMSAdXKhAuAttDW13TIl6AopyPsloKG4M0&oid=00D5j000006MzlW&dpt=null&viewId=">'

,

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbIp&operationContext=DELIVERY&contentId=05T5j00000Nh0td&page=0&d=/a/5j000001LuMD/u9GAPXqKLoeFWgUdPFNRpHUw39K7eBBEKFUiwwVE2gw&oid=00D5j000006MzlW&dpt=null&viewId=">'

};
        String body='<div style="background:#F0F8FF" ; padding:.5rem><br>';

        for(contact c : cont)
        {


            Integer randomNumber = Integer.valueof((Math.random() * marriageAnniversaryTags.size()));
                
            body+='<div style="text-align:center">';
            body+='<h3 style="padding:.5rem; color:#000;font-size:25px;font-family:garamond">Wish you a very Happy Marriage Anniversary <br>' + c.Name + '!</h3><br>';
            
            body+=marriageAnniversaryTags[randomNumber];
            body+='</div>';
            
            
            body+= '<br><label style="font-size:12px;color:#000">Regards,<br> Team BlackBaud</label></div>';
            
            

            mail.setToAddresses(new List<String>{c.Email});
            mail.setSubject('Happy Marriage Anniversary!');
            mail.setHtmlBody(body);
          mail.setCcAddresses(new List<String>{'dgblackbaud-sfdc@nagarro.com'});
            mail.setOrgWideEmailAddressId('0D25j000000KzduCAC');
            List<messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});

            

        }
    }
}