import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingbayComponent } from './loadingbay.component';

describe('LoadingbayComponent', () => {
  let component: LoadingbayComponent;
  let fixture: ComponentFixture<LoadingbayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingbayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingbayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
