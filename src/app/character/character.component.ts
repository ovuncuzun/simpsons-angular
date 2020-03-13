import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Dialog } from "./dialog/dialog.component";
import { Observable, of } from "rxjs";
import { Character } from "./character.model";
import { CharacterService } from "./character.service";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"]
})
export class CharacterComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl("")
  });
  characters$: Observable<Character[]> = this.characterService
    .charactersSubject$;
  searchResult$: Observable<Character[]> = this.characters$;

  constructor(
    public dialog: MatDialog,
    private characterService: CharacterService
  ) {}

  ngOnInit() {
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
      const { id, ...character } = data;
      if (id) {
        this.characterService.edit(id, character);
      } else if (character) {
        this.characterService.add(character);
      }
    });
  }
}
