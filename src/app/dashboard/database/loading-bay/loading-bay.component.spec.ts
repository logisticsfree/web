import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBayComponent } from './loading-bay.component';

describe('LoadingBayComponent', () => {
  let component: LoadingBayComponent;
  let fixture: ComponentFixture<LoadingBayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingBayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
