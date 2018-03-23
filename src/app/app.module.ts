import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { AddSubtractComponent } from './add-subtract/add-subtract.component';
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import {UserService} from "./user-service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule,MatInputModule,MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AddSubtractComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
