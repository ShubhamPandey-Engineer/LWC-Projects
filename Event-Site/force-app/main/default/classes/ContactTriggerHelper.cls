public class ContactTriggerHelper {

    //unique email method
    public static void ValidateEmail(List<Contact> contList)
    {
Set<String> email = new Set<String>();
for(Contact c : contList){
email.add(c.Email);
}
       
List<Contact> c1 = [Select id, Email from Contact where Email in: Email];
if(c1.size() > 0){
c1[0].addError('Duplicate Email');
}
    }
    
    
    
    //set Contact Detail updated field
    public static void UpdateField(List<Contact> contList)
    {
        for(Contact cont : contList)
        {
            cont.DetailUpdated__c =true;
        }
    }
    

    /*
    //create content distribution records for public link
    public static String createCD(Id contentVersionId, String title)
    {
        
        try{
            
        ContentDistribution cd =new ContentDistribution();
        cd.Name=title;
        cd.ContentVersionId=contentVersionId;
            cd.PreferencesAllowViewInBrowser= true;
            
        Database.SaveResult result=Database.insert(cd);
            system.debug(result);
          return cd.DistributionPublicUrl;
           // return result.isSuccess();

        }
        catch(Exception e)
        {
            return null;
        }
     
        /*
        try{
        List<ContentDistribution> cdList;
                 ContentDistribution cd =new ContentDistribution();

        for(contentVersion cv : cvList)
            {
        // ContentDistribution cd =new ContentDistribution();
        cd.Name=cv.Title;
        cd.ContentVersionId=cv.Id;       
        cd.PreferencesAllowViewInBrowser= true;
         
       //  cdList.add(cd);
            }
         
        Database.SaveResult result=Database.insert(cd);
         return result.isSuccess();

        }
        catch(Exception e)
        {
            system.debug(e.getMessage());
            return false;
          //  return e.getMessage();
        }
        
        
    }
    
    
    
    // link  CD  public link to  Contact field
    public static string linkProfileURL(Id contactId , Id cvId)
    {
        try{
         ContentDistribution ContentDis=[Select ContentDownloadUrl  from ContentDistribution where contentversionid =: cvId ];
            Contact uploadImage =new Contact();

            system.debug('q'+contentDis);
        uploadImage.Id=contactId;
        uploadImage.Profile_Image__c=ContentDis.DistributionPublicUrl;
            
        
        update uploadImage;
            return contentdis.DistributionPublicUrl;
        }
        
        catch(Exception e)
        {
            system.debug(e);
            return null;
        }
    }
    */
    
}