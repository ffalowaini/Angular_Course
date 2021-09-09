import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModel } from './app-routing.model';
import { SharedModel } from './shared/shared.model';
import { CoreModel } from './core.model';
import { StartComponent } from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModel,
    HttpClientModule,
    SharedModel,
    CoreModel,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule { }
