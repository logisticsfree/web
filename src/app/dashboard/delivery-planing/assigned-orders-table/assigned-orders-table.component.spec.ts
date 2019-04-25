import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedOrdersTableComponent } from './assigned-orders-table.component';

describe('AssignedOrdersTableComponent', () => {
  let component: AssignedOrdersTableComponent;
  let fixture: ComponentFixture<AssignedOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
