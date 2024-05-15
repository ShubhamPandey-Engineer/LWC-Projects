declare module "@salesforce/apex/AuthMember.createMember" {
  export default function createMember(param: {firstName: any, lastName: any, email: any, passwordString: any}): Promise<any>;
}
declare module "@salesforce/apex/AuthMember.resetPassword" {
  export default function resetPassword(param: {emailId: any, newPassword: any}): Promise<any>;
}
declare module "@salesforce/apex/AuthMember.loginMember" {
  export default function loginMember(param: {email: any, passwordString: any}): Promise<any>;
}
