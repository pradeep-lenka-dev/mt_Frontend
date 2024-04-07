
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Formconfig } from '../../interface/formconfig';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Modal Title';
  @Input() formConfig: Formconfig; // Assuming you have a FormConfig interface
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitEvent: EventEmitter<any> = new EventEmitter<any>();

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  submitForm(formData?: any): void {
    this.formSubmitEvent.emit(formData);
    this.closeModal();
  }
}
