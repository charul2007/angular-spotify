import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { combineReducers } from '@ngrx/store';

import * as fromHome from '../components/home/home.reducers';
import * as fromArtist from '../components/artist/artist.reducers';
import * as fromAlbum from '../components/album/album.reducers';

import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../store/utils';
export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  home: fromHome.State;
  artist: fromArtist.State;
  album: fromAlbum.State;
}
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  home: fromHome.reducer,
  artist: fromArtist.reducer,
  album: fromAlbum.reducer
};

const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer( state: any, action: any ) {
  return productionReducer(state, action);
}

/**
 * Home
 */
export const getHomeState = (state: State) => state.home;
export const getMusic = createSelector(getHomeState, fromHome.getMusic);

/**
 * Artist and Albums
 */
export const getArtistState = (state: State) => state.artist;
export const getArtist = createSelector(getArtistState, fromArtist.getArtist);
export const getArtistAlbums = createSelector(getArtistState, fromArtist.getArtistAlbums);

/**
 * Album
 */
export const getAlbumState = (state: State) => state.album;
export const getAlbum = createSelector(getAlbumState, fromAlbum.getAlbum);

