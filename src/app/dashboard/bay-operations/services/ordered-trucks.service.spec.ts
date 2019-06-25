import { TestBed } from '@angular/core/testing';

import { OrderedTrucksService } from './ordered-trucks.service';

describe('OrderedTrucksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderedTrucksService = TestBed.get(OrderedTrucksService);
    expect(service).toBeTruthy();
  });
});
