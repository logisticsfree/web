import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrdersTableComponent } from './pending-orders-table.component';

describe('PendingOrdersTableComponent', () => {
  let component: PendingOrdersTableComponent;
  let fixture: ComponentFixture<PendingOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
