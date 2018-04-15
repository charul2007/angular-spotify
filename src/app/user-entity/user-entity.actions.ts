import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOAD_USER_ENTITY:           type('[User Entity] Load'),
  LOAD_USER_ENTITY_COMPLETE:  type('[User Entity] Load Complete'),
  LOAD_USER_ENTITY_ERROR:  type('[User Entity] Load Error'),
};

export class LoadUserEntityAction implements Action {
  type = ActionTypes.LOAD_USER_ENTITY;
}

export class LoadUserEntityCompleteAction implements Action {
  type = ActionTypes.LOAD_USER_ENTITY_COMPLETE;

  constructor() { }
}

export class LoadUserEntityErrorAction implements Action {
  type = ActionTypes.LOAD_USER_ENTITY_ERROR;

  constructor( public payload: any ) { }
}
