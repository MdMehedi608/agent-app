import { getSiteMenuInformation } from "../../../utils/users/MenuApi";
import { SET_MENU_LIST } from "../../contants/action-type";

export const getAllMenuList = () => async (dispatch) => {
    const menuList = await getSiteMenuInformation();  
    dispatch({
      type: SET_MENU_LIST,
      payload: menuList,
    });
};