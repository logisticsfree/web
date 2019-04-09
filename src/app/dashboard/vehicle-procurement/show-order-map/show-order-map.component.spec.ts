import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderMapComponent } from './show-order-map.component';

describe('ShowOrderMapComponent', () => {
  let component: ShowOrderMapComponent;
  let fixture: ComponentFixture<ShowOrderMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrderMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
