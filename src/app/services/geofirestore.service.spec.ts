import { TestBed } from '@angular/core/testing';

import { GeofirestoreService } from './geofirestore.service';

describe('GeofirestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeofirestoreService = TestBed.get(GeofirestoreService);
    expect(service).toBeTruthy();
  });
});
