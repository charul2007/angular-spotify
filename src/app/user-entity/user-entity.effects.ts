import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as userEntityActions from './user-entity.actions';
import * as fromRoot from './../reducers';
import { SpotifyService } from '../services/spotify.services';

@Injectable()
export class UserEntityEffects {

  constructor( private store: Store<fromRoot.State>,
               private actions$: Actions,
               private spotifyService: SpotifyService) { }

  @Effect()
  loadUser$ = this.actions$
  .ofType(userEntityActions.ActionTypes.LOAD_USER_ENTITY)
  .switchMap(() => this.spotifyService.login()
    .map((res: any) => {
      if(res.error === 'invalid_client') {
        location.href = '/unauthorized.html';
      }
      else {
        let user = res.data;
        return new userEntityActions.LoadUserEntityCompleteAction();
      }
    })
  .catch(err =>  of(new userEntityActions.LoadUserEntityErrorAction({message: 'Failed to load Music'}))))
}