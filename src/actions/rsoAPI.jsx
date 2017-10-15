import * as types from '../constants/ActionTypes';
import { queryData, queryTypes } from '../api/queryData';


export function  ajaxRSORequestFinished(data) {
  return { type: types.REQUEST_ENDED, data }
}

export function ajaxRSORequestStarted() {
  return { type: types.REQUEST_STARTED }
}

export function ajaxRSORequest(query) {
  return (dispatch) => {
    dispatch(ajaxRSORequestStarted())
    queryData(query, (rsoInfo) => {
      dispatch(ajaxRSORequestFinished(rsoInfo));
    })
  };
}

export function updateFilter(filter) {
  return { type: types.UPDATE_FILTER, data: filter}
}

export function ajaxRSOTypeFinished(rsoTypes) {
  return { type: types.TYPES_LOADED, data: rsoTypes }
}

  export function ajaxRSOTypes() {
  return (dispatch) => {
    queryTypes((rsoTypes) => {
      dispatch(ajaxRSOTypeFinished(rsoTypes));
    })
  }
}
