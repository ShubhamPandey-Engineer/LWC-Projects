declare module "@salesforce/apex/AuthEmailHandler.isUniqueEmail" {
  export default function isUniqueEmail(param: {emailList: any}): Promise<any>;
}
declare module "@salesforce/apex/AuthEmailHandler.sendVerificationCode" {
  export default function sendVerificationCode(param: {emailId: any, code: any}): Promise<any>;
}
declare module "@salesforce/apex/AuthEmailHandler.passwordChangeVC" {
  export default function passwordChangeVC(param: {emailId: any, code: any}): Promise<any>;
}
