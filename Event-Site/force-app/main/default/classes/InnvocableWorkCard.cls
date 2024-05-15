public class InnvocableWorkCard {

    
    @InvocableMethod(Label='Test')
    public static void  sendCard(List<Contact> cont)
    {
         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
       
List<String> workAnniversaryTags=new List<String>{

'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbFu&operationContext=DELIVERY&contentId=05T5j00000Nh0nk&page=0&d=/a/5j000001LuLU/zMxDzBTfsoVrlibtO_NkOpOaT05mv9ywK5OrGegYjFY&oid=00D5j000006MzlW&dpt=null&viewId=" alt="WorkImages">'
,
'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbFv&operationContext=DELIVERY&contentId=05T5j00000Nh0mn&page=0&d=/a/5j000001LuLe/edaLd1JmCyTiGwsnCk4GVVfLwG5vEZIazVZrEgS5yt4&oid=00D5j000006MzlW&dpt=null&viewId=" alt="wImage">'
,
'<img src="https://nagarroinc19-dev-ed--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0685j000008NbG0&operationContext=DELIVERY&contentId=05T5j00000Nh0nu&page=0&d=/a/5j000001LuLj/a4URMaafs6L209PW7k00pHY1IEYyUU1d8rvAOWClrGA&oid=00D5j000006MzlW&dpt=null&viewId=" alt="wImage">'


};
        String body='<div style="background:#F0F8FF" ; padding:.5rem><br>';

        for(contact c : cont)
        {


            Integer randomNumber = Integer.valueof((Math.random() * workAnniversaryTags.size()));
                
            body+='<div style="text-align:center">';
            body+='<h3 style="padding:.5rem; color:#000;font-size:25px;font-family:garamond">Congratulations ' + c.Name + '!. You have completed ' + (integer)c.Total_Years__c + ' years with us. Many more to come.</h3><br>';
            
            body+=workAnniversaryTags[randomNumber];
            body+='</div>';
            
            
            body+= '<br><label style="font-size:12px">Regards,<br> Team BlackBaud</label></div>';
            
            

            mail.setToAddresses(new List<String>{c.Email});
            mail.setSubject('Happy Work Anniversary!');
            mail.setHtmlBody(body);
        //  mail.setCcAddresses(new List<String>{'dgnagarrosfdcdeveloper@nagarro.com'});
            mail.setCcAddresses(new List<String>{'dgblackbaud-sfdc@nagarro.com'});
            mail.setOrgWideEmailAddressId('0D25j000000KzduCAC');
            List<messaging.SendEmailResult> result= Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});

            

        }
    }
}