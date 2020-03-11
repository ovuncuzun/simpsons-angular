import { TestBed } from '@angular/core/testing';
import { CharacterService } from './character.service';
import { HttpClient } from "@angular/common/http";

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
