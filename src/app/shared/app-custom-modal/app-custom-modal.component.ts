//import { Component } from '@angular/core';

// @Component({
//   selector: 'app-app-custom-modal',
//   templateUrl: './app-custom-modal.component.html',
//   styleUrl: './app-custom-modal.component.scss'
// })
// export class AppCustomModalComponent {

// }



import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Formconfig } from '../../interface/formconfig';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './app-custom-modal.component.html',
  styleUrls: ['./app-custom-modal.component.html']
})
export class AppCustomModalComponent {
  //export class CustomModalComponent {
  @Input() title: string;
  @Input() Formconfig: Formconfig;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>(); // Define form configuration type as needed
  dynamicForm: FormGroup;
  static instance: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("calll...")
    this.dynamicForm = this.createFormGroup(this.Formconfig);
    console.log("🚀 ~ CustomModalComponent ~ ngOnInit ~ this.dynamicForm:", this.dynamicForm)
    // this.dynamicForm = this.createForm(this.formConfig);
  }

  createFormGroup(config: Formconfig): FormGroup {
   // console.log("🚀 ~ CustomModalComponent ~ createFormGroup ~ Formconfig:", this.Formconfig)
    const formControlsConfig = {};
    for (const key of Object.keys(config.fields)) {
      console.log("🚀 ~ CustomModalComponent ~ createFormGroup ~ key:", key)
      //formControlsConfig[key] = ['']; 
      formControlsConfig[key] = ['', config.validations?.[key] || []];// Initialize form controls with empty values
      console.log("🚀 ~ CustomModalComponent ~ createFormGroup ~ formControlsConfig[key]:", formControlsConfig[key])
    }
    return this.formBuilder.group(formControlsConfig);
  }

  getKeys(): string[] {
    return Object.keys(this.Formconfig);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log('Form submitted:', this.dynamicForm.value);
      // Handle form submission as needed
    }
  }

  closeModal() { }
}