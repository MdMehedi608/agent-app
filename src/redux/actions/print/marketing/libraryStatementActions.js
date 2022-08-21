import { toastr } from "react-redux-toastr";
import { getAllZila, getLibraryInfoByZila } from "../../../../utils/print/marketing/LibraryStatementApi";
import { SET_LIBRARY_INFO_LIST, SET_ZILA_LIST } from "../../../contants/action-type";

export const getAllZilaList = () => async (dispatch) => {
    const response = await getAllZila(); 
    if(!response.didError){
        dispatch({
            type: SET_ZILA_LIST,
            payload: response.model,
        });
    }else{
        toastr.error(response.errorMessage);
    }
    
};
export const getLibraryInfoListByZila = (zilaCode) => async (dispatch) => {
    const response = await getLibraryInfoByZila(zilaCode); 
    if(!response.didError){
        dispatch({
            type: SET_LIBRARY_INFO_LIST,
            payload: response.model,
        });
    }else{
        toastr.error(response.errorMessage);
    }
    
};