import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import {AddFormComponent} from './add-form/add-form.component'
import { NotificationModalComponent } from './notification-modal/notification-modal.component';


@NgModule({
  declarations: [
    NotificationModalComponent,
    //AddFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    NotificationModalComponent,
    // AddFormComponent
  ]
})
export class SharedModule { }
