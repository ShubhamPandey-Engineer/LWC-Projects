import updateMember from '@salesforce/apex/GetData.updateMember';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, api, track, wire } from 'lwc';
import { displayUserImage } from 'c/commonJS'


//picklist api
import Contact from '@salesforce/schema/Contact';


import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';


//related files



// import static resources
/*
import { loadScript } from 'lightning/platformResourceLoader';
import hash from '@salesforce/resourceUrl/States';*/
import Board__c from '@salesforce/schema/Contact.Board__c';

export default class UpdateMemberDetail extends LightningElement {

    @track fileData = {}

    @track userStateCity = {
        citySelected: undefined,
        stateSelected: undefined
    }

    homePage = false;
    @api memberInfo = {}

    showUpdateModal = false;
    showModal = true
    @track updatedInfo = {}

    boardValue;

    imageStatus = false;

    img;
    isLoading = false;




    // to get the default record type id, if you dont' have any recordtypes then it will get master

    @wire(getObjectInfo, { objectApiName: Contact })

    contactMetadata;

    @wire(getPicklistValues,

        {

            recordTypeId: '$contactMetadata.data.defaultRecordTypeId',

            fieldApiName: Board__c

        }

    )

    boardPickList;






    renderedCallback() {
        console.log('rendered called')
        /*this.updatedInfo = { ...this.memberInfo }  // need to remove
        this.boardValue = this.updatedInfo.Board__c
        if (this.updatedInfo.Profile_Image_URL__c === 'https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7') {
            this.updatedInfo.Profile_Image_URL__c = undefined
            console.log('done')
        }*/
    }






    connectedCallback() {
        this.img = this.memberInfo.Profile_Image_URL__c || `https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7`
        console.log(this.memberInfo)

        this.userStateCity.citySelected = this.memberInfo.MailingCity
        this.userStateCity.stateSelected = this.memberInfo.MailingState

        this.updatedInfo = { ...this.memberInfo }
        this.boardValue = this.updatedInfo.Board__c

    }




    // bind property
    handleInput(event) {

        //const value=event.target.value;

        this.updatedInfo[event.currentTarget.name] = event.target.value;





    }



    // handler to store state-city mapping
    stateCityHandler(event) {
        this.updatedInfo.MailingState = event.detail.stateSelected;
        this.updatedInfo.MailingCity = event.detail.citySelected;
    }



    //show file uploaded label
    get fileUploaded() {
        return (this.imageStatus) ? true : false
    }



    //close modal

    closeModal() {
        const closeModalEvent = new CustomEvent("closeupdatemodal", {
            detail: this.showUpdateModal
        });
        this.dispatchEvent(closeModalEvent);
        this.showModal = false
    }


    //uploadi mg

    //upload image





    // handle update btn
    handleUpdateMember() {
        this.isLoading = true;
        try {
            this.template.querySelector('c-upload-Profile-Image').displayError();
            this.template.querySelector('c-state-City-Mapping').check()

        }
        catch (err) {
            console.log(err)
        }
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input'), ...this.template.querySelectorAll("lightning-combobox"), ...this.template.querySelectorAll("lightning-textarea")]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);



        // if mandatory field are filled
        console.log(isInputsCorrect, this.updatedInfo['Profile_Image_URL__c'])
        if (isInputsCorrect && this.updatedInfo['Profile_Image_URL__c'] &&
            this.updatedInfo['MailingState'] && this.updatedInfo['MailingCity']) {

            //perform success logic

            //this.updatedInfo.MailingState=this.stateValue;

            console.log(this.updatedInfo)


            updateMember({ memberInfo: this.updatedInfo })
                .then((res) => {
                    this.isLoading = true;
                    console.log({ res })
                    // info. updated
                    if (typeof res == 'object') {
                        //show success popup
                        this.dispatchEvent(new ShowToastEvent({
                            title: 'Updated Successfully',
                            message: 'Your detail has been updated.',
                            variant: 'success'
                        }));
                        //call new data method
                        this.newData(res)

                        this.closeModal()


                        //get new data
                    }

                    else {
                        //not updated
                        this.isLoading = false
                        let errorString;
                        if (res.indexOf('Employee_ID__c') > 1) {
                            errorString = 'Please use a unique Employee Id'
                        }

                        else if (res.indexOf('Laptop_Number__c') > 1) {
                            errorString = 'Please use a unique Laptop Number'

                        }


                        this.dispatchEvent(new ShowToastEvent({
                            title: 'Update Error',
                            message: errorString,
                            variant: 'error'
                        }));


                    }
                })
                .catch((err) => {



                    this.isLoading = false;
                    //not updated
                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Failed',
                        message: 'Failed to update your detail',
                        variant: 'error'
                    }));
                })




        }


        // mandatory fields not filled
        else {
            this.isLoading = false
            //show error
            this.dispatchEvent(new ShowToastEvent({
                title: 'Updation failed',
                message: 'Required Fields cannot be empty',
                variant: 'error'
            }));
        }

    }

    //get new data
    newData(data) {
        //send new updated detail of the member
        const event = new CustomEvent("r", {
            detail: [data]
        });
        this.dispatchEvent(event)

    }
    //close modal

    closeModal() {
        this.showUpdateModal = false;
        this.showModal = false
        const closeModalEvent = new CustomEvent("closeupdatemodal", {
            detail: this.showUpdateModal
        });
        this.dispatchEvent(closeModalEvent);


    }



    //clear form
    clearFormInput() {
        //this.load()


        const inputs = this.template.querySelectorAll("lightning-input");
        const labelError = this.template.querySelectorAll("div.slds-form-element__help");
        console.log(labelError)

        // clear each input value
        inputs.forEach(formInput => {
            formInput.value = null;

        });

        //clear  input error label
        labelError.forEach(forInput => {
            forInput.innerHTML = '';
        })

        this.imageStatus = false

    }


    // handle file upload 
    getFileData(event) {
        console.log(event)
        console.log('file on parent 1', this.updatedInfo)
        try {
            this.updatedInfo['Profile_Image_URL__c'] = event.detail

        }
        catch (err) {
            console.log(err)
        }
        console.log('file on parent 2', this.updatedInfo)

    }



    // handle file error
    handleFileUploadError(event) {
        this.updatedInfo['Profile_Image_URL__c'] = undefined;

    }


}