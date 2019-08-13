import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderPostComponent } from './placeholder-post.component';

describe('PlaceholderPostComponent', () => {
  let component: PlaceholderPostComponent;
  let fixture: ComponentFixture<PlaceholderPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceholderPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
