public class ContactTriggerHandler {

    //Before Insert method
    public static void BeforeInsert(List<Contact> contactList)
    {
        Set<String> newEmail = new Set<String>();
for(Contact c : contactList){
newEmail.add(c.Email);
}

    }
    
   
}