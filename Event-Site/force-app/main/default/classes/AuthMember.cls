public without sharing class AuthMember{

   AuthMember(){
   }
    
   static String accountId='0015j00000VlekPAAR';
   static String orgWideAddressEmailId='0D25j000000KzduCAC';
    
    public static String createHashPassword(String passwordString){
        system.debug(passwordString);
       blob hashPassword =  Crypto.generateDigest('SHA-512', Blob.valueOf(passwordString));
       return EncodingUtil.base64Encode(hashPassword);
    }
    
    public static boolean verifyHashPassword(String hashedPassword,String passwordString){
        return (hashedPassword == AuthMember.createHashPassword(passwordString));
    }

   
// create record with account
@AuraEnabled()
public static Boolean createMember(String firstName , String lastName , String email , String passwordString){
    Contact newMember =new Contact();
    newMember.FirstName=firstName;
    newMember.LastName=lastName;
    newMember.HashPassword__c= AuthMember.createHashPassword(passwordString);
    newMember.email=email;
    newMember.AccountId=AuthMember.accountId;
    try {       
      Database.SaveResult result=Database.insert(newMember,false);
        //record created
        if(result.isSuccess())
        {
            return true;
        }
        else{
        system.debug(result);
            return false;
        }
    } catch (Exception e) {
       System.debug(e.getMessage());
       return false;
    } 
}

//reset password

@AuraEnabled()
public static boolean resetPassword(string  emailId , string newPassword){
        List<Contact> updateUser=[SELECT hashpassword__c  FROM Contact WHERE Email =:emailId limit 1];
        // if user found
        if(updateUser.size() ==1)
        {
      List<Contact>  updatedList=new List<Contact>();
            //update the password;
            for(Contact user : updateUser)
            {
                user.hashpassword__c= AuthMember.createHashPassword(newPassword);
                updatedList.add(user);
                system.debug(user.HashPassword__c);
            }
            try {
                Database.SaveResult[] result=Database.update(updatedList,false);
            } catch (Exception e) {
                System.debug(e.getMessage());
               return false;
            }  
            return true;
    }
    // no user found
    else{
return false;
    }
}
   
//login crdentials checked
@AuraEnabled(cacheable=true)
   public static Boolean loginMember(String email, String passwordString){
       try {         
            List<Contact> credentials=[SELECT Email ,hashpassword__c  FROM Contact WHERE (Email =:email)limit 1];
            if(credentials.size() ==1){
                String hashedPassword = credentials[0]?.hashpassword__c;
                if(AuthMember.verifyHashPassword(hashedPassword,passwordString)){
               		return true;
               }
            }
            return false;
       }
            catch (Exception e) {
           system.debug(e.getMessage());
           throw new AuraHandledException(e.getMessage());
       }
}
}