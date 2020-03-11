import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { Routes, RouterModule } from '@angular/router';
import { CharacterService } from './character.service';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "characters",
    component: CharacterComponent
  }
];


@NgModule({
  declarations: [CharacterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [CharacterService],
  exports: [CharacterComponent]
})
export class CharacterModule { }
