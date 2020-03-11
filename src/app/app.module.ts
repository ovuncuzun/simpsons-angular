import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CharacterModule } from "./character/character.module";
import { Dialog } from "./character/dialog/dialog.component";
import { PhraseModule } from "./phrase/phrase.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    CharacterModule,
    PhraseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [Dialog]
})
export class AppModule {}
