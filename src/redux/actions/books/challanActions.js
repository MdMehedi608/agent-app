import moment from "moment";
import { toastr } from "react-redux-toastr";
import { getAllChallanOrderInfo } from "../../../utils/books/ChallanApi";
import { SET_AGENT_CHALLAN_LIST } from "../../contants/action-type";
import { setPagingTotalCount } from "../commonActions";

export const getAllAgentChallanList = (params) => async (dispatch) => {
    let requestModel = {
        ...params,
        fromDate: params.fromDate
            ? moment(new Date(params.fromDate)).format("YYYY-MM-DD")
            : "",
        toDate: params.toDate
            ? moment(new Date(params.toDate)).format("YYYY-MM-DD")
            : "",
    };

    const response = await getAllChallanOrderInfo(requestModel); 
    if(!response.didError){
        if (response.model) {
            dispatch({
                type: SET_AGENT_CHALLAN_LIST,
                payload: response.model
            });
            dispatch(setPagingTotalCount(response.itemsCount));
        }
    }else{
        toastr.error(response.errorMessage);
    }
    
};