// import { Action } from '@ngrx/store';
// // import { Artist } from '../../shared/interface/artist';
// import * as homeActions from './user-entity.actions';

// export interface State  {
//   music: Artist[];
// }

// export const initialState: State = {
//   music: [],
// };

// export function reducer(
//   state = initialState,
//   action
// ): State {
//   switch (action.type) {
//     case homeActions.ActionTypes.LOAD_MUSIC_COMPLETE: {
//       return Object.assign({}, state, {
//         music: action.payload
//       });
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export const getMusic = (state: State) => state.music;
