import { Routes, CanActivate, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
// import { GuardService as AuthGuard } from './services/guard.service';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';

export const routes: Routes = [

  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'about',
    component: AboutComponent
  },
  { 
    path: 'artist/:id',
    component: ArtistComponent
  },
  { 
    path: 'album/:id',
    component: AlbumComponent
  },
  { path: '**', redirectTo: '' } // default fallback

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
