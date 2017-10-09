import * as types from '../constants/ActionTypes';
import { queryData } from '../api/queryData';


export function  ajaxRSORequestFinished(data) {
  return { type: types.REQUEST_ENDED, data }
}

export function ajaxRSORequestStarted() {
  return { type: types.REQUEST_STARTED }
}

export function ajaxRSORequest(query) {
  return (dispatch) => {
    dispatch(ajaxRSORequestStarted())
    queryData((rsoInfo) => {
      console.log(rsoInfo)
      dispatch(ajaxRSORequestFinished(rsoInfo));
    })
  };
}
