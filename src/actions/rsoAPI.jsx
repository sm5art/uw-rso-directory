import * as types from '../constants/ActionTypes';

export function Todo(text) {
  return { type: types.TODO, text };
}
