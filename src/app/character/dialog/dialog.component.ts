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
    id: new FormControl(this.data._id),
    firstName: new FormControl(this.data.firstName),
    lastName: new FormControl(this.data.lastName),
    picture: new FormControl(this.data.picture),
    age: new FormControl(this.data.age)
  });

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data?: Character
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
