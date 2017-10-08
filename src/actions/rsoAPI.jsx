import * as types from '../constants/ActionTypes';
import { queryData } from '../api/queryData';



export function  ajaxRSORequestFinished(data) {
  return { type: types.REQUEST_STARTED, data }
}

export function ajaxRSORequest(query) {
  return (dispatch) => {
    queryData((rsoInfo) => {

    })
  };
}
