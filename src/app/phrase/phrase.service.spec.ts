import { TestBed } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";
import { PhraseService } from './phrase.service';

describe('PhraseService', () => {
  let service: PhraseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PhraseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
