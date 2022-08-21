import { SHOW_SCROLL } from "../contants/action-type";

const initialState = {
  isScroll: false
};
export const footerReducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case SHOW_SCROLL:
      return { ...state, isScroll: payload };
    default:
      return state;
  }
};