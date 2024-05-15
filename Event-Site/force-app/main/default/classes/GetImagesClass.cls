public class GetImagesClass{
public static List<String> GetImages(string eventName){
List<ContentDistribution> cdList = new List<ContentDistribution>();
string likeV = '%' + eventname +'%';
cdList = [Select id , Name , DistributionPublicUrl   from ContentDistribution where name like : likeV];
List<String> imageList = new List<String>();
System.debug(cdList.size());
for(ContentDistribution cd : cdList){
	if(cd.Name.contains(eventName)){
		imageList.add('<img src="  ' + cd.DistributionPublicUrl +' " >');
	}
}
return imageList;
}
}