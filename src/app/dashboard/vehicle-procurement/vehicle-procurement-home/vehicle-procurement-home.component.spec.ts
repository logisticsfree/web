import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleProcurementHomeComponent } from './vehicle-procurement-home.component';

describe('VehicleProcurementHomeComponent', () => {
  let component: VehicleProcurementHomeComponent;
  let fixture: ComponentFixture<VehicleProcurementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleProcurementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleProcurementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
