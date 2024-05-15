public without sharing class FileUpload {
    public FileUpload() {

    }

    //Upoad Image

    @AuraEnabled()
    public static  string uploadFile(Id  nId ,Id memberId ,String file ,string fileName)
    {
        
     String  BASE_URL = URL.getSalesforceBaseUrl().toExternalForm();

        try{  

        
            String base64File = EncodingUtil.urlDecode(file, 'UTF-8');     
            ContentVersion contentVersionRec = new ContentVersion();
            contentVersionRec.NetworkId=nId;  
            contentVersionRec.Title = fileName; 
            contentVersionRec.PathOnClient = '/' + fileName;
            contentVersionRec.ContentLocation='S';
            contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);  
            contentVersionRec.IsMajorVersion = true;  
            contentVersionRec.Origin='H';
            
            Insert contentVersionRec;  


         //   ContentWorkspace ws = [SELECT Id, RootContentFolderId FROM ContentWorkspace WHERE Name = 'test' LIMIT 1];



          Id  contentToInsert = [select ContentDocumentId from ContentVersion WHERE Id =: contentVersionRec.Id].ContentDocumentId;
            ContentDocumentLink cl = new ContentDocumentLink();
            cl.ContentDocumentId =  contentToInsert;
            
       cl.LinkedEntityId = memberId;

//cl.LinkedEntityId = '0585j000000PQMmAAO';


           cl.ShareType = 'I';
            cl.Visibility = 'AllUsers';
            insert cl;
         


 //string result= FileUpload.createCDRecord(contentVersionRec);


   // map url to contact
 // String url=FileUpload.linkProfileURL(memberId, contentVersionRec.Id);

//boolean t=Schema.sObjectType.ContentDistribution.isCreateable();

return 'errr';
            
          } catch(Exception ex){ 

            return ex.getMessage();
          }  
    }


    //create CD record
    public static string createCDRecord(ContentVersion cv)
    {

           try{
            ContentDistribution cd =new ContentDistribution();
            cd.Name=cv.Title + 'public';
            cd.ContentVersionId=cv.Id;
            cd.PreferencesAllowViewInBrowser= true;
            insert cd;
            return 'cd created';
           }
           catch(Exception e)
           {
          return  e.getMessage();

           }
    }


    //map URL

    public static string linkProfileURL (Id contactId , Id cvId)
    {
        try{
 //map image to contact
 ContentDistribution  cd=[Select ContentDownloadUrl  from ContentDistribution where contentversionid =: cvId ];

 Contact uploadImage =new Contact();
 uploadImage.Id=contactId;
 uploadImage.Profile_Image__c=cd.ContentDownloadUrl;

 update uploadImage;
 return uploadImage.Profile_Image__c;
    
}
catch(Exception e)
{
return e.getMessage();
}
    }


















    //preview
    @AuraEnabled(cacheable=true)
    public static Map<ID, String> getRelatedFilesByRecordId(String recordId) {
        // Get record file IDs        
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        List<ID> fileIDs = new List<ID>();
        for (ContentDocumentLink docLink : files) {
            fileIDs.add(docLink.ContentDocumentId);
        }
 
        List<ContentVersion> docs = [SELECT ContentDocumentId, FileExtension, Title 
            FROM ContentVersion WHERE ContentDocumentId IN : fileIDs];
        Map<ID, String> mapIdTitle = new Map<ID, String>();
        for (ContentVersion docLink : docs) {
            mapIdTitle.put(docLink.ContentDocumentId, docLink.Title);
        }
        return mapIdTitle;
    }
}