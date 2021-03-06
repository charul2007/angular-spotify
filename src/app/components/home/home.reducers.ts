import { Action } from '@ngrx/store';
import { Artist } from '../../shared/interface/artist';
import * as homeActions from './home.actions';

export interface State  {
  music: Artist[];
}

export const initialState: State = {
  music: [],
};

export function reducer(
  state = initialState,
  action
): State {
  switch (action.type) {
    case homeActions.ActionTypes.LOAD_MUSIC_COMPLETE: {
      return Object.assign({}, state, {
        music: action.payload
      });
    }

    case homeActions.ActionTypes.CLEAR_LOAD_MUSIC: {
      return Object.assign({}, state, {
        music: []
      });
    }

    default: {
      return state;
    }
  }
}

export const getMusic = (state: State) => state.music;
