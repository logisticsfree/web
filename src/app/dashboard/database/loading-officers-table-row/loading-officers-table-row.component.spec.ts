import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOfficersTableRowComponent } from './loading-officers-table-row.component';

describe('LoadingOfficersTableRowComponent', () => {
  let component: LoadingOfficersTableRowComponent;
  let fixture: ComponentFixture<LoadingOfficersTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingOfficersTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOfficersTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
