import { Action } from '@ngrx/store';
import { Artist } from '../../shared/interface/artist';
import * as albumActions from './album.actions';

export interface State  {
  album: object;
}

export const initialState: State = {
  album: [],
};

export function reducer(
  state = initialState,
  action
): State {
  switch (action.type) {
    case albumActions.ActionTypes.LOAD_ALBUM_COMPLETE: {
      return Object.assign({}, state, {
        album: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getAlbum = (state: State) => state.album;
