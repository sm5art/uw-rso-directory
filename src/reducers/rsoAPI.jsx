import { REQUEST_STARTED, REQUEST_ENDED, TYPES_LOADED } from '../constants/ActionTypes';

const initialState = {
  data: [],
  types: [],
  loaded: false,
  loading: false,
};

export default function todos(state = initialState, action) {
  switch (action.type) {
  case REQUEST_STARTED:
    return Object.assign({}, state, {loading: true});
  case REQUEST_ENDED:
    return Object.assign({}, state, {loading: false, loaded: true, data: action.data})
  case TYPES_LOADED:
    return Object.assign({}, state, {types: action.data})
  default:
    return Object.assign({}, state);
  }
}
