import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { CharacterModule } from "./character.module";
import { CharacterComponent } from "./character.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CharacterService } from "./character.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BehaviorSubject } from "rxjs";
import { Character } from "./character.model";
import { mockCharacters } from "./character.service.spec";
import { Dialog } from './dialog/dialog.component';
import { MatDialog } from '@angular/material';

describe("Character Component", () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let activateRouteSpy = {
    snapshot: {
      params: {
        id: 1
      }
    }
  };

  let dialogSpy = jasmine.createSpyObj('MatDialog', ["open"])
  let characterServiceSpy = jasmine.createSpyObj("CharacterService", [
    "getAll",
    "delete",
    "edit",
    "add"
  ]);
  characterServiceSpy.charactersSubject$ = new BehaviorSubject<Character[]>([]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CharacterModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activateRouteSpy },
        {
          provide: CharacterService,
          useValue: characterServiceSpy
        },
        {
          provide: MatDialog,
          useValue: dialogSpy
        }
      ]
    })
      .compileComponents()
      .then(() => {
        characterServiceSpy.charactersSubject$.next(mockCharacters.data);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deletes clicking button", () => {
    let charactersEl: HTMLElement = fixture.debugElement.nativeElement;
    let deleteBtn = charactersEl.querySelector("button.delete");
    deleteBtn.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    expect(characterServiceSpy.delete).toHaveBeenCalled();
  });

  it('clicks on button to add character', () => {
    let charactersEl: HTMLElement = fixture.debugElement.nativeElement;
    let fabBtn = charactersEl.querySelector(".fab");
    fabBtn.dispatchEvent(new Event("click"));
    fixture.detectChanges()
    expect(dialogSpy.open).toHaveBeenCalled();
  })


  it('clicks on button to edit character', () => {
    let charactersEl: HTMLElement = fixture.debugElement.nativeElement;
    let fabBtn = charactersEl.querySelector(".fab");
    fabBtn.dispatchEvent(new Event("click"));
    fixture.detectChanges()
    expect(dialogSpy.open).toHaveBeenCalled();
  })
});
