import { Action } from '@ngrx/store';
import { Album } from '../../shared/interface/album';
import { Artist } from '../../shared/interface/artist';
import { type } from '../../util';

export const ActionTypes = {

  LOAD_ALBUM: type('[Album] Load Album'),
  LOAD_ALBUM_COMPLETE: type('[Album] Load Album Complete'),
  LOAD_ALBUM_ERROR: type('[Album] Load Album Error')

};

export class LoadAlbum implements Action {
  type = ActionTypes.LOAD_ALBUM;

  constructor(public payload: Album) { }
}
export class LoadAlbumComplete implements Action {
  type = ActionTypes.LOAD_ALBUM_COMPLETE;

  constructor(public payload: Artist[]) { }
}
export class LoadAlbumError implements Action {
  type = ActionTypes.LOAD_ALBUM_ERROR;

  constructor(public payload: { message: string }) { }
}
