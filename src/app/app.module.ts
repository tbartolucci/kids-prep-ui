import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddSubtractComponent } from './add-subtract/add-subtract.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSubtractComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
