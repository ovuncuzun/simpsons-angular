import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Character } from "../character/character.model";
import { CharacterService } from "../character/character.service";
import { Phrase } from "./phrase.model";
import { PhraseService } from "./phrase.service";

@Component({
  selector: "app-phrase",
  templateUrl: "./phrase.component.html",
  styleUrls: ["./phrase.component.scss"]
})
export class PhraseComponent implements OnInit {
  characterId: string;
  phrases: Phrase[];
  phraseForm = new FormGroup({
    phrase: new FormControl(""),
    id: new FormControl("")
  });
  character: Character;

  constructor(
    private route: ActivatedRoute,
    private phraseService: PhraseService,
    private characterService: CharacterService
  ) {
    this.phraseService.characterPhrasesSubject$.subscribe(phrases => {
      this.phrases = phrases;
    });
  }

  ngOnInit() {
    this.characterId = this.route.snapshot.params.id;
    this.characterService.getOne(this.characterId).subscribe(character => {
      this.character = character;
    });
    this.phraseService.getCharacterPhrases(this.characterId);
  }

  deletePhrase(id: string) {
    this.phraseService.delete(id);
  }

  addEditPhrase() {
    const { phrase, id } = this.phraseForm.value;
    if (id && phrase) {
      this.phraseService.editPhrase(id, {
        _id: id,
        character: this.character._id,
        phrase
      });
      return this.resetForm();
    } else if (phrase) {
      this.phraseService.addPhrase({
        character: this.character._id,
        phrase
      });
      return this.resetForm();
    }
  }

  resetForm() {
    this.phraseForm.reset();
  }

  editPhrase(phrase: Phrase) {
    this.phraseForm.setValue({ phrase: phrase.phrase, id: phrase._id });
  }
}
