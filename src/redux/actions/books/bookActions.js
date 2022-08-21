import { toastr } from "react-redux-toastr";
import { getAllBrandList, getAllClassList, getAllEditionList, getAllGroupList, GetBookDetailsByCode } from "../../../utils/books/BookApi";
import { DROPDOWN_BRAND_LIST, DROPDOWN_CLASS_LIST, DROPDOWN_EDITION_LIST, DROPDOWN_GROUP_LIST, SET_DETAILS_BOOKS } from "../../contants/action-type";


export const setBookDetails = (bookCode) => async (dispatch) => {    
    const response = await GetBookDetailsByCode(bookCode);
    if(!response.didError){
        dispatch({
            type: SET_DETAILS_BOOKS,
            payload: response.model,
        });
    }else{
        toastr.error(response.errorMessage);
    }
}

export const brandAllDataList = () => async (dispatch) => {
    const response = await getAllBrandList(); 
    if(!response.didError){
        dispatch({
            type: DROPDOWN_BRAND_LIST,
            payload: response.model,
        });
    }else{
        toastr.error(response.errorMessage);
    }
    
};

export const classAllDataList = () => async (dispatch) => {
    const response = await getAllClassList(); 
    if(!response.didError){
        dispatch({
            type: DROPDOWN_CLASS_LIST,
            payload: response.model,
        });
    }else{
        toastr.error(response.errorMessage);
    }
    
};

export const editionAllDataList = () => async (dispatch) => {
    const response = await getAllEditionList(); 
    if(!response.didError){
        dispatch({
            type: DROPDOWN_EDITION_LIST,
            payload: response.model,
        });
    }else{
        toastr.error(response.errorMessage);
    }
    
};

export const groupAllDataList = () => async (dispatch) => {
    const response = await getAllGroupList(); 
    if(!response.didError){
        dispatch({
            type: DROPDOWN_GROUP_LIST,
            payload: response.model,
        });
    }else{
        toastr.error(response.errorMessage);
    }
    
};

export const bookDetails = (data) => {
    return {
      type: SET_DETAILS_BOOKS,
      payload: data
    };
};