import moment from "moment";
import { toastr } from "react-redux-toastr";
import { getAllConfirmOrderInfo, getOrderDetailsByOrderNo } from "../../../utils/books/OrderApi";
import { SET_AGENT_ORDER_LIST } from "../../contants/action-type";
import { setPagingTotalCount } from "../commonActions";

export const getAllAgentOrderList = (params) => async (dispatch) => {
    let requestModel = {
        ...params,
        fromDate: params.fromDate
            ? moment(new Date(params.fromDate)).format("YYYY-MM-DD")
            : "",
        toDate: params.toDate
            ? moment(new Date(params.toDate)).format("YYYY-MM-DD")
            : "",
    };
    const response = await getAllConfirmOrderInfo(requestModel); 
    if(!response.didError){
        if (response.model) {
            dispatch({
                type: SET_AGENT_ORDER_LIST,
                payload: response.model
            });
            dispatch(setPagingTotalCount(response.itemsCount));
        }
    }else{
        toastr.error(response.errorMessage);
    }
    
};

export const orderDetailsByOrderNo = (orderNo, demandNo) => async (dispatch) => {
    const response = await getOrderDetailsByOrderNo(orderNo, demandNo); 
    if(!response.didError){
        if (response.model) {
            dispatch({
                type: SET_AGENT_ORDER_LIST,
                payload: response.model
            });
            dispatch(setPagingTotalCount(response.itemsCount));
        }
    }else{
        toastr.error(response.errorMessage);
    }
    
};
