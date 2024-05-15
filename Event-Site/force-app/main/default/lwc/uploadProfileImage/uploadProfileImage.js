import { LightningElement,api } from 'lwc';
import {defaultProfileURL} from 'c/commonJS'

const maxImgSize = 95;
export default class UploadProfileImage extends LightningElement {

    imgCompressed=true;
    imageSelected
    showError
    @api userImage = defaultProfileURL
   
    
   
   


connectedCallback(){
}

@api 
displayError(){
    //console.log('ui',this.userImage)
    this.showError = (this.userImage === undefined ||this.userImage === defaultProfileURL)?true:false
}




processFile(event){
    var compressedImage; // declare variable c here
   
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onloadend = async function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
  
      imgElement.onload = async function (e) {
        console.log('fired')
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 200;
  
        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;
  
        const ctx = canvas.getContext("2d");
  
        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
        compressedImage = ctx.canvas.toDataURL('image/jpeg', 20); // assign value to variable c here
        
      };
    }
 console.log('onload ended')
    console.log(compressedImage); // this will be undefined since the onload event has not fired yet

    // to return the value of c outside the onload event, you can use a Promise and await its resolution
    async function imageAfterLoad() {
        return new Promise((resolve,reject) => {
            const intervalId = setInterval(() => {
                if (compressedImage) {
                    clearInterval(intervalId);
                    resolve(compressedImage);
                }
                else{
                    reject(err)
                }
            }, 100);
        });
    }

    imageAfterLoad().then((result) => {
        this.userImage =result
        if(this.userImage != undefined){
            this.showError = false
            this.imgCompressed = true
        const selectedEvent = new CustomEvent("fileupload", {
        detail: this.userImage
      });
      // Dispatches the event.
      this.dispatchEvent(selectedEvent);
        }
    }).catch(err=>{
        console.log(err)
        const selectedEvent = new CustomEvent("fileuploaderror", {
            detail: "Please upload an image"
          });
      
          // Dispatches the event.
        this.dispatchEvent(selectedEvent);
        return 
    })
}




}