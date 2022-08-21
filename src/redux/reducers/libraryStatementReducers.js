import { SET_LIBRARY_INFO_LIST, SET_ZILA_LIST } from "../contants/action-type";

const initialState = {
  zilaList: [],
  libraryInfoList: [],
};
export const libraryStatementReducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_ZILA_LIST:
      return { ...state, zilaList: payload };
      break;
    case SET_LIBRARY_INFO_LIST:
      return { ...state, libraryInfoList: payload };
      break;
    default:
      return state;
  }
};