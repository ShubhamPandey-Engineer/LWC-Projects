declare module "@salesforce/apex/GetData.getMembers" {
  export default function getMembers(): Promise<any>;
}
declare module "@salesforce/apex/GetData.getRecepient" {
  export default function getRecepient(): Promise<any>;
}
declare module "@salesforce/apex/GetData.checkMemberUpdate" {
  export default function checkMemberUpdate(param: {emailId: any}): Promise<any>;
}
declare module "@salesforce/apex/GetData.updateMember" {
  export default function updateMember(param: {memberInfo: any}): Promise<any>;
}
