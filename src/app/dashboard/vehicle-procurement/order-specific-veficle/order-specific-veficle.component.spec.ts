import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSpecificVeficleComponent } from './order-specific-veficle.component';

describe('OrderSpecificVeficleComponent', () => {
  let component: OrderSpecificVeficleComponent;
  let fixture: ComponentFixture<OrderSpecificVeficleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSpecificVeficleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSpecificVeficleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
