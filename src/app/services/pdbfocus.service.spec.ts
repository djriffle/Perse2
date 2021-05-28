import { TestBed } from '@angular/core/testing';

import { PdbfocusService } from './pdbfocus.service';

describe('PdbfocusService', () => {
  let service: PdbfocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdbfocusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
