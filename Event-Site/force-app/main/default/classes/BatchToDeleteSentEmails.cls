public class BatchToDeleteSentEmails implements Database.Batchable<sobject> , Database.Stateful{
    
    Integer recordsDeleted =0;
    
    @InvocableMethod // To call it from Scheduled flow
    public static void BatchToDeleteSentEmails(){  
        Database.executeBatch(new BatchToDeleteSentEmails());
    }
    
    
    public DataBase.QueryLocator Start(Database.BatchableContext batchContext){
        return DataBase.getQueryLocator([Select id from EmailMessage limit 500000]);
        
    }
    
    public void Execute(Database.BatchableContext batchContext , List<EmailMessage> emailsList){
        
        Delete emailsList;
        recordsDeleted += emailsList.size();
    }
    
    public void Finish(Database.BatchableContext batchContext){
        System.debug('No of Email records deleted ' + recordsDeleted);
    }

}