import { SET_MENU_LIST } from "../contants/action-type";

const initialState = {
  menuList: [],
};
export const menuReducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_MENU_LIST:
      return { ...state, menuList: payload };
      break;
    default:
      return state;
  }
};