import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormPopupComponent } from './edit-form-popup.component';

describe('EditFormPopupComponent', () => {
  let component: EditFormPopupComponent;
  let fixture: ComponentFixture<EditFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
