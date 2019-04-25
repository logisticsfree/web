import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitOrderFormComponent } from './split-order-form.component';

describe('SplitOrderFormComponent', () => {
  let component: SplitOrderFormComponent;
  let fixture: ComponentFixture<SplitOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
