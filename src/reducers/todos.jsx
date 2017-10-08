import { TODO } from '../constants/ActionTypes';

const initialState = {
  text: ""
};

export default function todos(state = initialState, action) {
  switch (action.type) {
  case TODO:
    return Object.assign({}, {text: action.text}, state);

  default:
    return Object.assign({}, state);
  }
}
