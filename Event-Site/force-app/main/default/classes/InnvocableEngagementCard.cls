public class InnvocableEngagementCard {


    @InvocableMethod(Label='Test')
    public static void  sendCard(List<Contact> cont)
    {
         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
       
List<String> engagementImgTags=new List<String>{
'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000005KREk&operationContext=DELIVERY&contentId=05T5j00000G4aMW&page=0&d=/a/5j000000Devq/zuSqSz1jZAdU4zABwvbJX0xm22urxVtGE0BPSiPQkh0&oid=00D5j000006MzlW&dpt=null&viewId=">'
,
'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008Nc0X&operationContext=DELIVERY&contentId=05T5j00000Nh2XZ&page=0&d=/a/5j000001LuMX/8qn03UheEToAkmdQU1HtG.bI.hok0uthrAX_BReDN5c&oid=00D5j000006MzlW&dpt=null&viewId=">'

};
        String body='<div style="background:#F0F8FF" ; padding:.5rem><br>';

        for(contact c : cont)
        {


            Integer randomNumber = Integer.valueof((Math.random() * engagementImgTags.size()));
                
            body+='<div style="text-align:center">';
            body+='<h3 style="padding:.5rem; color:#000;font-size:25px;font-family:garamond">Congratulations on your Engagement ' + c.Name + '!.</h3><br>';
            
            body+=engagementImgTags[randomNumber];
            body+='</div>';

            
            
            body+= '<br><label style="font-size:12px">Regards,<br> Team BlackBaud</label></div>';
            
            

            mail.setToAddresses(new List<String>{c.Email});
            mail.setSubject('Happy Engagement!');
            mail.setHtmlBody(body);
            mail.setCcAddresses(new List<String>{'dgblackbaud-sfdc@nagarro.com'});
            mail.setOrgWideEmailAddressId('0D25j000000KzduCAC');
            List<messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});

            

        }
    }
}