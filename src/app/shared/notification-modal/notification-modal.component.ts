import { Component,Inject, Input, Output,EventEmitter} from '@angular/core';

export interface NotificationData {
  title: string;
  message:string;
  type:'success' | 'failure'
}

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.scss'
})

export class NotificationModalComponent {
  @Input() data:NotificationData;
  @Output() close = new EventEmitter<void>();
  
  onClose():void{
    this.close.emit();
  }


}
