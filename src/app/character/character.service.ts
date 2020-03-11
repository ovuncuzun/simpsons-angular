import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from './character.model';
import { map } from "rxjs/operators";
import { v1 as uuidv1 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  charactersSubject$ = new BehaviorSubject<Character[]>([]);
  constructor(private http: HttpClient) {
    this.getAll()
      .then(characters => this.charactersSubject$.next(characters))
      .catch(console.log);
  }

  getAll(): Promise<Character[]> {
    return this.http
      .get("/assets/characters.json")
      .pipe(map((characters: any) => characters.data))
      .toPromise();
  }

  getOne(id: string) {
    return this.charactersSubject$.pipe(
      map(character => character.find(character => character._id === id))
    );
  }

  delete(id: string) {
    this.charactersSubject$.next(
      this.charactersSubject$.value.filter(character => character._id !== id)
    );
  }

  edit(id: string, updatedCharacter: Character) {
    this.charactersSubject$.next(
      this.charactersSubject$.value.map(character => {
        if (character._id === id) return { _id: id, ...updatedCharacter };
        return character;
      })
    );
  }

  add(newCharacter: Character) {
    this.charactersSubject$.next([
      ...this.charactersSubject$.value,
      { ...newCharacter, _id: uuidv1() }
    ]);
  }
}
