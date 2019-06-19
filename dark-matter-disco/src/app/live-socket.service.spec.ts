import { TestBed } from '@angular/core/testing';

import { LiveSocketService } from './live-socket.service';

describe('LiveSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveSocketService = TestBed.get(LiveSocketService);
    expect(service).toBeTruthy();
  });
});
