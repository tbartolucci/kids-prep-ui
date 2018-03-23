import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

import { LoginComponent } from './login/login.component';
import {UserService} from './user-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    CardModule,
    ButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
