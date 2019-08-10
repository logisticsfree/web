import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOrdersViewComponent } from './assign-orders-view.component';

describe('AssignOrdersViewComponent', () => {
  let component: AssignOrdersViewComponent;
  let fixture: ComponentFixture<AssignOrdersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignOrdersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
