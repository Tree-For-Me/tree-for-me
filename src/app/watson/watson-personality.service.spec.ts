import { TestBed } from '@angular/core/testing';

import { WatsonPersonalityService } from './watson-plant-info.service';

describe('WatsonPersonalityService', () => {
  let service: WatsonPersonalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatsonPlantInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
