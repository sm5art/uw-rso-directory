import { REQUEST_STARTED, REQUEST_ENDED } from '../constants/ActionTypes';

const initialState = {
  data: [],
  loaded: false,
  loading: false,
};

export default function todos(state = initialState, action) {
  switch (action.type) {
  case REQUEST_STARTED:
    return Object.assign({}, state, {loading: true});
  case REQUEST_ENDED:
    return Object.assign({}, state, {loading: false, loaded: true, data: action.data})
  default:
    return Object.assign({}, state);
  }
}
