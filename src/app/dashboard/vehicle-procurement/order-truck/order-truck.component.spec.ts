import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTruckComponent } from './order-truck.component';

describe('OrderTruckComponent', () => {
  let component: OrderTruckComponent;
  let fixture: ComponentFixture<OrderTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
