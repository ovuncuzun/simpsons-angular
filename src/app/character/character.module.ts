import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { CharacterComponent } from "./character.component";
import { CharacterService } from "./character.service";
import { Dialog } from "./dialog/dialog.component";

const routes: Routes = [
  {
    path: "characters",
    component: CharacterComponent
  }
];

@NgModule({
  declarations: [CharacterComponent, Dialog],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [CharacterService],
  exports: [CharacterComponent]
})
export class CharacterModule { }
