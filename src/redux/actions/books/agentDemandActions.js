import moment from "moment";
import { toastr } from "react-redux-toastr";
import { addAgentDemand, getAllDemandInfo, getDemandDetailsByNo } from "../../../utils/books/AgentDemandApi";
import { ADD_CART, ADD_CART_PRICE, ORDER_CONFIRM, SET_CART_LIST, SET_DEMAND_DETAILS, SET_DEMAND_LIST } from "../../contants/action-type";
import { setPagingTotalCount } from "../commonActions";

export const addOrderInfo = (orderData) => async (dispatch) => {
    const response = await addAgentDemand(orderData); 
    if(!response.didError){
        if (response.model) {
            toastr.success(response.message);
            dispatch({
                type: ORDER_CONFIRM,
            });
        }
    }else{
        toastr.error(response.errorMessage);
    }
    
};

export const getAllDemandList = (params) => async (dispatch) => {
    let requestModel = {
        ...params,
        fromDate: params.fromDate
            ? moment(new Date(params.fromDate)).format("YYYY-MM-DD")
            : "",
        toDate: params.toDate
            ? moment(new Date(params.toDate)).format("YYYY-MM-DD")
            : "",
    };

    const response = await getAllDemandInfo(requestModel); 
    if(!response.didError){
        if (response.model) {
            dispatch({
                type: SET_DEMAND_LIST,
                payload: response.model
            });
            // dispatch(handlePagingParameterChange({name: "totalcount", value: response.itemsCount}));
            dispatch(setPagingTotalCount(response.itemsCount));
        }
    }else{
        toastr.error(response.errorMessage);
    }
    
};

export const demandDetailsByDemandNo = (params) => async (dispatch) => {
    
    const response = await getDemandDetailsByNo(params); 
    if(!response.didError){
        if (response.model) {
            dispatch({
                type: SET_DEMAND_DETAILS,
                payload: response.model
            });
        }
    }else{
        toastr.error(response.errorMessage);
    }
    
};



export const addOrderConfirm = () => {
    return {
        type: ORDER_CONFIRM
      };   
    
};

export const addCartList = (data) => {
    return {
      type: SET_CART_LIST,
      payload: data
    };
};
export const addCart = (data) => {
    return {
      type: ADD_CART,
      payload: data
    };
};
export const addCartPrice = (data) => {
    return {
      type: ADD_CART_PRICE,
      payload: data
    };
};

export const removeCartStroage = () => {
    return {
      type: ORDER_CONFIRM,
    };
};