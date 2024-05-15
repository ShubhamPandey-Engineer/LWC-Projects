import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFile from '@salesforce/apex/FileUploaderClass.uploadFile'


export default class UploadImage extends LightningElement {

    imageType = [
        { label: 'Birthday Image', value: 'BD' },
        { label: 'Work Anniversary Image', value: 'WA' },
        { label: 'Marriage Anniversary Image', value: 'MA' },
        { label: 'Enagagement Image', value: 'E' }
    ]

    imgUploadedType;
    fileContent;


    changeImageType(event) {
        this.imgUploadedType = event.detail.value;
        console.log(event.detail.value)
    }

    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            const modifiedFileName = file.name.split('.jpg')[0] + '/' + this.imgUploadedType + '/'
            this.fileContent = {
                'filename': modifiedFileName + '.jpg',
                'base64': base64,
                'recordId': '0015j00000VlekPAAR'
            }
            console.log(this.fileContent)
        }
        reader.readAsDataURL(file)
    }

    handleUpload() {
        const { base64, filename, recordId } = this.fileContent
        uploadFile({ base64, filename, recordId }).then(result => {
            this.fileContent = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
        })
    }

    toast(title) {
        const toastEvent = new ShowToastEvent({
            title,
            variant: "success"
        })
        this.dispatchEvent(toastEvent)
    }


    handleCancel() {

    }
}