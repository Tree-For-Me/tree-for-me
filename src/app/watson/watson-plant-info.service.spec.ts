import { TestBed } from '@angular/core/testing';

import { WatsonPlantInfoService } from './watson-plant-info.service';

describe('WatsonPlantInfoService', () => {
  let service: WatsonPlantInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatsonPlantInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
