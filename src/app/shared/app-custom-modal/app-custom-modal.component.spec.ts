import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCustomModalComponent } from './app-custom-modal.component';

describe('AppCustomModalComponent', () => {
  let component: AppCustomModalComponent;
  let fixture: ComponentFixture<AppCustomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppCustomModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCustomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
