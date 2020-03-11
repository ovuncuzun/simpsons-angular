import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Dialog } from './dialog/dialog.component';

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

  constructor(private characterService: CharacterService,
    public dialog: MatDialog, ) { }

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

  openDialog(character?: Character) {
    const dialogRef = this.dialog.open(Dialog, {
      data: character ? character : {}
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      const { _id: id, ...character } = data;
      if (id) {
        this.characterService.edit(id, character);
      } else {
        this.characterService.add(character);
      }
    });
  }

}
