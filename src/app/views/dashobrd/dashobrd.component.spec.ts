import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashobrdComponent } from './dashobrd.component';

describe('DashobrdComponent', () => {
  let component: DashobrdComponent;
  let fixture: ComponentFixture<DashobrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashobrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashobrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
