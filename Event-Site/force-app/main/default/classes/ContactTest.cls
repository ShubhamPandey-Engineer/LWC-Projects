@isTest
public class ContactTest {

    static void singleEmail()
    {
      //create contacts with same email address
      
        List<Contact> conList=new List<Contact>();
        /*for(integer i=0;i<10;i++)
            {
                Contact con =new Contact(lastname='test1');
                conList.add(con);
            }
*/
       
        Contact con =new Contact(lastname='test1',Email='shubham.pandey@nagarro.com');
                conList.add(con);
    Database.SaveResult[] result=Database.insert(conList,false);
        
    }
}