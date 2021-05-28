import { TestBed } from '@angular/core/testing';

import { PdbminerService } from './pdbminer.service';

describe('PdbminerService', () => {
  let service: PdbminerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdbminerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
