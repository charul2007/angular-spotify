import { Action } from '@ngrx/store';
// import { PaginatedData } from '../shared/interface/paginated-data';
// import { EngineeringNeed } from '../shared/interface/engneed';
import { type } from '../../util';

export const ActionTypes = {

  LOAD_MUSIC: type('[Home] Load Music'),
  LOAD_MUSIC_COMPLETE: type('[Home] Load Music Complete'),
  LOAD_MUSIC_ERROR: type('[Home] Load Music Error'),

};

export class LoadMusic implements Action {
  type = ActionTypes.LOAD_MUSIC;

  constructor(public payload: { search: string, offset: number, limit: number, type: string, market: string }) { }
}
export class LoadMusicComplete implements Action {
  type = ActionTypes.LOAD_MUSIC_COMPLETE;

  constructor(public payload: {}) { }
}
export class LoadMusicError implements Action {
  type = ActionTypes.LOAD_MUSIC_ERROR;

  constructor(public payload: { message: string }) { }
}
