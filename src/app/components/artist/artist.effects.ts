import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as artistActions from './artist.actions';
import * as fromRoot from '../../reducers';
import { SpotifyService } from '../../services/spotify.services';

@Injectable()
export class ArtistEffects {

  constructor( private store: Store<fromRoot.State>,
               private actions$: Actions,
               private spotifyService: SpotifyService) { }

  @Effect()
  artist$ = this.actions$
  .ofType(artistActions.ActionTypes.LOAD_ARTIST)
  .map((action: any) => action.payload)
  .switchMap(payload => {
    return this.spotifyService.getArtist(payload.id)
    .map((res: any) => new artistActions.LoadArtistComplete(res))
    .catch(() => of(new artistActions.LoadArtistError({message: 'Failed to load Artist'})));
    })
  .catch(err =>  of(new artistActions.LoadArtistError({message: 'Failed to load Artist'})))

  @Effect()
  artistalbums$ = this.actions$
  .ofType(artistActions.ActionTypes.LOAD_ARTIST_ALBUMS)
  .map((action: any) => action.payload)
  .switchMap(payload => {
    return this.spotifyService.getArtistAlbums(payload.id)
    .map((res: any) => new artistActions.LoadArtistAlbumsComplete(res))
    .catch(() => of(new artistActions.LoadArtistAlbumsError({message: 'Failed to load Artist Albums'})));
    })
  .catch(err =>  of(new artistActions.LoadArtistAlbumsError({message: 'Failed to load Artist Albums'})))

}
