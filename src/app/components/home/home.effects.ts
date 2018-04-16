import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as homeActions from './home.actions';
import * as fromRoot from '../../reducers';
import { SpotifyService } from '../../services/spotify.services';

@Injectable()
export class HomeEffects {

  constructor( private store: Store<fromRoot.State>,
               private actions$: Actions,
               private spotifyService: SpotifyService) { }

  @Effect()
  create$ = this.actions$
  .ofType(homeActions.ActionTypes.LOAD_MUSIC)
  .debounceTime(300)
  .map((action: any) => action.payload)
  .switchMap(payload => {
    return this.spotifyService.searchMusic(payload)
    .map((res: any) => new homeActions.LoadMusicComplete(res))
    .catch(() => of(new homeActions.LoadMusicError({message: 'Failed to load Music'})));
    })
  .catch(err =>  of(new homeActions.LoadMusicError({message: 'Failed to load Music'})))

}
