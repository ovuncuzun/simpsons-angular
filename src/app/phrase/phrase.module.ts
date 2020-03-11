import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhraseComponent } from "./phrase.component";
import { Routes, RouterModule } from "@angular/router";
import {
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "characters/:id/phrases",
    component: PhraseComponent
  }
];

@NgModule({
  declarations: [PhraseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class PhraseModule { }
