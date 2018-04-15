import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { SpotifyService } from './services/spotify.services';

import { HomeEffects } from './components/home/home.effects';
import { ArtistEffects } from './components/artist/artist.effects';
import { AlbumEffects } from './components/album/album.effects';
import { reducers } from './reducers';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { LoadingIndicator } from './shared/loading-indicator';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    HomeComponent,
    ArtistComponent,
    AlbumComponent,
    LoadingIndicator
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    EffectsModule.forRoot([
      HomeEffects,
      ArtistEffects,
      AlbumEffects
    ]),
    StoreModule.forRoot(reducers)
  ],
  providers: [appRoutingProviders, SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
