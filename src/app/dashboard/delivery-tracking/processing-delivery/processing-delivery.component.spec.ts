import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingDeliveryComponent } from './processing-delivery.component';

describe('ProcessingDeliveryComponent', () => {
  let component: ProcessingDeliveryComponent;
  let fixture: ComponentFixture<ProcessingDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
