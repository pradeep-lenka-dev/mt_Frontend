import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFormComponent } from './add-form/add-form.component';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppCustomModalComponent } from './app-custom-modal/app-custom-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new Subject<boolean>();
  private modalConfig: Subject<any> = new Subject<any>();

  constructor(private ModalService: NgbModal,
    private http: HttpClient) { }

  async add({ title, type, message, body, cancelBtnText }) {
    console.log("🚀 ~ ModalService ~ add ~ title:", title)
    const modalRef = this.ModalService.open(AddFormComponent, { centered: true })
    modalRef.componentInstance.title = title || "defult title";
    modalRef.componentInstance.type = type || "defult type";
    modalRef.componentInstance.message = message || "defult message"
    await modalRef.result.catch()
    return modalRef.result;
  }
  openModal(config: any): void {
    this.modalState.next(true);
    this.modalConfig.next(config);
  }

  getModalState(): Observable<boolean> {
    return this.modalState.asObservable();
  }
  closeModal(): void {
    this.modalState.next(false);
  }

  getModalConfig(): Subject<any> {
    return this.modalConfig;
  }

}
