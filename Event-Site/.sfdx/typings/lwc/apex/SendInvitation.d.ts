declare module "@salesforce/apex/SendInvitation.nonAttachmentEmail" {
  export default function nonAttachmentEmail(param: {recepientList: any, emailSubject: any, emailBody: any, senderEmailId: any}): Promise<any>;
}
declare module "@salesforce/apex/SendInvitation.attachedEmail" {
  export default function attachedEmail(param: {recepientList: any, recordId: any, emailSubject: any, emailBody: any, senderEmailId: any}): Promise<any>;
}
