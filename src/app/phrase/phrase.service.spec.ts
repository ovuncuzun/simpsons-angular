import { TestBed } from "@angular/core/testing";

import { PhraseService } from "./phrase.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

export const mockPhrases = {
  data: [
    {
      _id: "59edff64d9be8f7aa11e0c44",
      character: "59edee68706374dfa957842f",
      phrase:
        "Wait a minute. Bart’s teacher is named ‘Krabappel’? Oh, I’ve been calling her ‘Crandall.’ Why didn’t anyone tell me? Ohhh, I’ve been making an idiot out of myself!"
    },
    {
      _id: "59edff6492d619b4a933a56b",
      character: "59edee68706374dfa957842f",
      phrase:
        "Now we play the waiting game…Ahh, the waiting game sucks. Let’s play Hungry Hungry Hippos!"
    },
    {
      _id: "59edff6477ac8539e526682b",
      character: "59edee689509e51682ff8e02",
      phrase: "Go out on a Tuesday? Who am I, Charlie Sheen?"
    }
  ]
};

describe("PhraseService", () => {
  const httpSpy = jasmine.createSpyObj("HttpClient", ["get"]);
  httpSpy.get.and.returnValue(of(mockPhrases));
  let service: PhraseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpSpy
        }
      ]
    });
    service = TestBed.get(PhraseService);
    service.phrases$.next(mockPhrases.data);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("get phrases", () => {
    service.getAll().then(result => {
      expect(result).toEqual(mockPhrases.data);
    });
  });

  it("get character phrases", () => {
    let characterId = mockPhrases.data[1].character;
    service.getCharacterPhrases(characterId);

    expect(service.characterPhrasesSubject$.value).toEqual(
      mockPhrases.data.filter(phrase => phrase.character === characterId)
    );
  });

  it("add phrase", () => {
    let newPhrase = {
      character: "4567",
      phrase: "Hello, world!"
    };

    service.addPhrase(newPhrase);
    expect(
      service.phrases$.value.find(
        phrase => phrase.character === newPhrase.character
      )
    ).toBeTruthy();
  });

  it("edit phrase", () => {
    let updatedPhrase = {
      ...mockPhrases.data[1],
      phrase: "new phrase!"
    };
    service.editPhrase(updatedPhrase._id, updatedPhrase);

    expect(
      service.phrases$.value.find(phrase => phrase._id == updatedPhrase._id)
        .phrase
    ).toEqual(updatedPhrase.phrase);
  });

  it("delete phrase", () => {
    const id = mockPhrases.data[0]._id;
    service.delete(id);
    expect(service.phrases$.value.length).toBe(mockPhrases.data.length - 1);
  });
});
