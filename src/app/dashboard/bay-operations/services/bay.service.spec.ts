import { TestBed } from '@angular/core/testing';

import { BayService } from './bay.service';

describe('BayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BayService = TestBed.get(BayService);
    expect(service).toBeTruthy();
  });
});
