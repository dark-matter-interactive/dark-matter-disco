import { TestBed } from '@angular/core/testing';

import { httpService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: httpService = TestBed.get(httpService);
    expect(service).toBeTruthy();
  });
});
