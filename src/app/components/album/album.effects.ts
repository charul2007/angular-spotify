import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as albumActions from './album.actions';
import * as fromRoot from '../../reducers';
import { SpotifyService } from '../../services/spotify.services';

@Injectable()
export class AlbumEffects {

  constructor( private store: Store<fromRoot.State>,
               private actions$: Actions,
               private spotifyService: SpotifyService) { }

  @Effect()
  album$ = this.actions$
  .ofType(albumActions.ActionTypes.LOAD_ALBUM)
  .map((action: any) => action.payload)
  .switchMap(payload => {
    return this.spotifyService.getSingleAlbum(payload.id)
    .map((res: any) => new albumActions.LoadAlbumComplete(res))
    .catch(() => of(new albumActions.LoadAlbumError({message: 'Failed to load Album'})));
    })
  .catch(err =>  of(new albumActions.LoadAlbumError({message: 'Failed to load Album'})))

}
