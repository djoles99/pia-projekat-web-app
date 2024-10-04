import { TestBed } from '@angular/core/testing';

import { KnjigeService } from './knjige.service';

describe('KnjigeService', () => {
  let service: KnjigeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnjigeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
