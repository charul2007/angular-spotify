import { Action } from '@ngrx/store';
import { Artist } from '../../shared/interface/artist';
import * as artistActions from './artist.actions';

export interface State  {
  artist: Artist[];
  artistAlbums: Artist[];
}

export const initialState: State = {
  artist: [],
  artistAlbums: []
};

export function reducer(
  state = initialState,
  action
): State {
  switch (action.type) {
    case artistActions.ActionTypes.LOAD_ARTIST_COMPLETE: {
      return Object.assign({}, state, {
        artist: action.payload
      });
    }

    case artistActions.ActionTypes.LOAD_ARTIST_ALBUMS_COMPLETE: {
      return Object.assign({}, state, {
        artistAlbums: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getArtist = (state: State) => state.artist;
export const getArtistAlbums = (state: State) => state.artistAlbums;

