import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOfficersComponent } from './loading-officers.component';

describe('LoadingOfficersComponent', () => {
  let component: LoadingOfficersComponent;
  let fixture: ComponentFixture<LoadingOfficersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingOfficersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
