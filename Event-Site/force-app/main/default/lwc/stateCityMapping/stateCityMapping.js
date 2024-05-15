import { LightningElement, track ,api } from 'lwc';
import {data} from 'c/commonJS'


export default class StateCityMapping extends LightningElement {
    @track data;
    @track stateList
    @api userObj
    @track mapping
    @track placeholder={
        state:'Select a option',
        city:'Select a state first'
    }

   
    connectedCallback(){
        this.mapping = {...this.userObj}
        this.placeholder = {...this.userObj}

        console.log(this.userObj)
        console.log('statecity cpm',this.userObj.stateSelected)
        if (this.placeholder?.stateSelected == undefined) {
            this.placeholder.stateSelected = 'Select a option'
            this.placeholder.citySelected = 'Select a state first'
           
        } 
        else{       this.mapping.cities = this.data[this.mapping.stateSelected]?.map((stateName) => {
            return { label: stateName, value: stateName }
        })   }}



    constructor() {
        super()
        this.data = data
        this.stateList = Object.keys(this.data).map((stateName) => {
           return { label: stateName, value: stateName }
       })
    }
   

    @api check(){
        const isInputsCorrect = [...this.template.querySelectorAll("lightning-combobox")]
        .reduce((validSoFar, inputField) => {
        inputField.reportValidity();
        return validSoFar && inputField.checkValidity();
        }, true);
        }
    
   


    mapCities(event) {
        this.mapping.stateSelected = event.detail.value
        this.placeholder.citySelected = 'Select an option'
        this.mapping.citySelected = undefined
        this.mapping.cities = this.data[this.mapping.stateSelected]?.map((stateName) => {
            return { label: stateName, value: stateName }
        })


    }


   
    setCity(event) {
        this.mapping.citySelected = event.detail.value
        const { cities, ...selectedMapping } = this.mapping
        const stateCityEvent = new CustomEvent('mapstatecity',{
            detail :  selectedMapping}
        )
        this.dispatchEvent(stateCityEvent)
        console.log(selectedMapping)
    }
}