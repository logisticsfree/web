import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVehicleComponent } from './order-vehicle.component';

describe('OrderVehicleComponent', () => {
  let component: OrderVehicleComponent;
  let fixture: ComponentFixture<OrderVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
