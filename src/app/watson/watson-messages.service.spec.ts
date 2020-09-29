import { TestBed } from '@angular/core/testing';

import { WatsonMessagesService } from './watson-messages.service';

describe('WatsonMessagesService', () => {
  let service: WatsonMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatsonMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
