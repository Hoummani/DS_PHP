import { TestBed } from '@angular/core/testing';

import { ScolariteService } from './scolarite.service';

describe('ScolariteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScolariteService = TestBed.get(ScolariteService);
    expect(service).toBeTruthy();
  });
});
