import { TestBed } from "@angular/core/testing";

import { CharacterService } from "./character.service";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const mockCharacters = {
  data: [
    {
      _id: "59edee68706374dfa957842f",
      firstName: "Homer",
      lastName: "Simpson",
      picture:
        "http://www.trbimg.com/img-573a089a/turbine/ct-homer-simpson-live-pizza-debate-met-0517-20160516",
      age: 43
    },
    {
      _id: "59edee689509e51682ff8e02",
      firstName: "Marge",
      lastName: "Simpson",
      picture:
        "https://vignette.wikia.nocookie.net/simpsons/images/8/87/Marge_Simpson_2.png/revision/latest?cb=20150131104556",
      age: 40
    }
  ]
};

describe("CharacterService", () => {
  const httpSpy = jasmine.createSpyObj("HttpClient", ["get"]);
  httpSpy.get.and.returnValue(of(mockCharacters));
  let service: CharacterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpSpy
        }
      ]
    });
    service = TestBed.get(CharacterService);
    service.charactersSubject$.next(mockCharacters.data);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("get characters", () => {
    service.getAll().then(result => {
      expect(result).toEqual(mockCharacters.data as any);
    });
  });

  it("have all characters", () => {
    expect(service.charactersSubject$.value.length).toBe(
      mockCharacters.data.length
    );
  });

  it("gets one character", () => {
    service.getOne(mockCharacters.data[0]._id).subscribe(character => {
      expect(character).toEqual(mockCharacters.data[0]);
    });
  });

  it("add character", () => {
    let newCharacter = {
      firstName: "woo",
      lastName: "cheng",
      age: 12,
      picture: "img.png"
    };

    service.add(newCharacter);
    expect(service.charactersSubject$.value.length).toBe(
      mockCharacters.data.length + 1
    );
    expect(
      service.charactersSubject$.value.find(
        c => c.firstName === newCharacter.firstName
      )
    ).toBeTruthy();
  });
  it("edits a character", () => {
    let update = {
      ...mockCharacters.data[1],
      firstName: "Jane"
    };

    service.edit(update._id, update);
    expect(
      service.charactersSubject$.value.find(
        c => c.firstName === update.firstName
      )
    ).toEqual(update);
  });

  it("deletes a character", () => {
    let characterId = mockCharacters.data[0]._id;
    service.delete(characterId);
    expect(
      service.charactersSubject$.value.find(c => c._id === characterId)
    ).toBe(undefined);
  });
});
