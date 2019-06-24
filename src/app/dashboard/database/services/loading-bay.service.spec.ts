import { TestBed } from '@angular/core/testing';

import { LoadingBayService } from './loading-bay.service';

describe('LoadingBayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingBayService = TestBed.get(LoadingBayService);
    expect(service).toBeTruthy();
  });
});
