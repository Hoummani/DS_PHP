import { TestBed } from '@angular/core/testing';

import { GuardScolaritieService } from './guard-scolaritie.service';

describe('GuardScolaritieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardScolaritieService = TestBed.get(GuardScolaritieService);
    expect(service).toBeTruthy();
  });
});
