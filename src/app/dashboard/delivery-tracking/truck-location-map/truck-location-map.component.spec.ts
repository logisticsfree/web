import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckLocationMapComponent } from './truck-location-map.component';

describe('TruckLocationMapComponent', () => {
  let component: TruckLocationMapComponent;
  let fixture: ComponentFixture<TruckLocationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckLocationMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
