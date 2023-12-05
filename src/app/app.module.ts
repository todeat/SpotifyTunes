import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './screens/home/home.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { LibraryComponent } from './screens/library/library.component';
import { RecomComponent } from './screens/recom/recom.component';
import { LoginComponent } from './screens/login/login.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    LibraryComponent,
    RecomComponent,
    LoginComponent,
    ArtistListComponent,
    SongsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
