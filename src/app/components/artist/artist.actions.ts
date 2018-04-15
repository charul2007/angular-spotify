import { Action } from '@ngrx/store';
import { Album } from '../../shared/interface/album';
import { Artist } from '../../shared/interface/artist';
import { type } from '../../util';

export const ActionTypes = {

  LOAD_ARTIST: type('[Artist] Load Artist'),
  LOAD_ARTIST_COMPLETE: type('[Artist] Load Artist Complete'),
  LOAD_ARTIST_ERROR: type('[Artist] Load Artist Error'),

  LOAD_ARTIST_ALBUMS: type('[Artist] Load Artist Albums'),
  LOAD_ARTIST_ALBUMS_COMPLETE: type('[Artist] Load Artist Albums Complete'),
  LOAD_ARTIST_ALBUMS_ERROR: type('[Artist] Load Artist Albums Error')

};

export class LoadArtist implements Action {
  type = ActionTypes.LOAD_ARTIST;

  constructor(public payload: Album) { }
}
export class LoadArtistComplete implements Action {
  type = ActionTypes.LOAD_ARTIST_COMPLETE;

  constructor(public payload: Artist[]) { }
}
export class LoadArtistError implements Action {
  type = ActionTypes.LOAD_ARTIST_ERROR;

  constructor(public payload: { message: string }) { }
}

export class LoadArtistAlbums implements Action {
  type = ActionTypes.LOAD_ARTIST_ALBUMS;

  constructor(public payload: Album) { }
}
export class LoadArtistAlbumsComplete implements Action {
  type = ActionTypes.LOAD_ARTIST_ALBUMS_COMPLETE;

  constructor(public payload: Artist[]) { }
}
export class LoadArtistAlbumsError implements Action {
  type = ActionTypes.LOAD_ARTIST_ALBUMS_ERROR;

  constructor(public payload: { message: string }) { }
}
