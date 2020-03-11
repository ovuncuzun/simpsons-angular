import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { v1 as uuidv1 } from "uuid";
import { Phrase } from "./phrase.model";

@Injectable({
  providedIn: "root"
})
export class PhraseService {
  phrases$ = new BehaviorSubject<Phrase[]>([]);
  characterPhrasesSubject$ = new BehaviorSubject<Phrase[]>([]);

  constructor(private http: HttpClient) {
    this.getAll()
      .then(phrases => this.phrases$.next(phrases))
      .catch(console.log);
  }

  getAll(): Promise<Phrase[]> {
    return this.http
      .get("/assets/phrases.json")
      .pipe(map((phrases: any) => phrases.data))
      .toPromise();
  }

  getCharacterPhrases(id: string) {
    this.phrases$.subscribe(phrases => {
      this.characterPhrasesSubject$.next(
        phrases.filter(phrase => phrase.character === id)
      );
    });
  }

  delete(id: string) {
    this.phrases$.next(this.phrases$.value.filter(phrase => phrase._id !== id));
  }

  addPhrase(phrase: Phrase) {
    this.phrases$.next([...this.phrases$.value, { ...phrase, _id: uuidv1() }]);
  }

  editPhrase(id: string, updatedPhrase: Phrase) {
    this.phrases$.next(
      this.phrases$.value.map(phrase => {
        if (phrase._id === id) return updatedPhrase;
        return phrase;
      })
    );
  }
}
