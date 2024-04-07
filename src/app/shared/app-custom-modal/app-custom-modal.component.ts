
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
    // this.dynamicForm = this.createForm(this.formConfig);
  }




  closeModal() { }
}
