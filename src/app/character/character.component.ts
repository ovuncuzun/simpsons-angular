import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl("")
  });
  characters$: Observable<Character[]> = this.characterService
    .charactersSubject$;
  searchResult$: Observable<Character[]> = this.characters$;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.searchForm
      .get("search")
      .valueChanges.subscribe(value =>
        this.searchCharacters(value.toLowerCase())
      );
  }

  searchCharacters(value: string) {
    this.characters$.subscribe(characters => {
      this.searchResult$ = of(
        characters.filter(
          c =>
            c.lastName.toLowerCase().includes(value) ||
            c.firstName.toLowerCase().includes(value)
        )
      );
    });
  }

  deleteCharacter(id: string) {
    this.characterService.delete(id);
  }

}
