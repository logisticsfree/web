import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRouteMapComponent } from './edit-route-map.component';

describe('EditRouteMapComponent', () => {
  let component: EditRouteMapComponent;
  let fixture: ComponentFixture<EditRouteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRouteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
