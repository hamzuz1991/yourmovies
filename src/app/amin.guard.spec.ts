import { TestBed, async, inject } from '@angular/core/testing';

import { AminGuard } from './amin.guard';

describe('AminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AminGuard]
    });
  });

  it('should ...', inject([AminGuard], (guard: AminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
