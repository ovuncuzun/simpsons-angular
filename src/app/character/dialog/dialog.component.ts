import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl } from "@angular/forms";
import { Character } from '../character.model';

@Component({
  selector: "app-dialog",
  styleUrls: ["./dialog.component.scss"],
  templateUrl: "./dialog.component.html"
})
export class Dialog {
  dialogForm = new FormGroup({
    id: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    picture: new FormControl(""),
    age: new FormControl("")
  });

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data?: Character
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
