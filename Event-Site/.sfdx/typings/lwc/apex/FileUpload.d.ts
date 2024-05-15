declare module "@salesforce/apex/FileUpload.uploadFile" {
  export default function uploadFile(param: {nId: any, memberId: any, file: any, fileName: any}): Promise<any>;
}
declare module "@salesforce/apex/FileUpload.getRelatedFilesByRecordId" {
  export default function getRelatedFilesByRecordId(param: {recordId: any}): Promise<any>;
}
