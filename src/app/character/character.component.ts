import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  characters$: Observable<Character[]> = this.characterService
    .charactersSubject$;
  searchResult$: Observable<Character[]> = this.characters$;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
  }

}
