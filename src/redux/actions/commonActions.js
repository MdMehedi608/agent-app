import { CHANGE_DEMAND_PARAM_INPUT, CHANGE_PAGING_PARAMETER, CHANGE_PARAMETER_INPUT, PAGING_TOTAL_COUNT } from "../contants/action-type";

export const handleParameterInputChange = (event) => (dispatch) => {
    const { name, value } = event.target;
    const inputData = {
      name,
      value,
    };
    dispatch({
      type: CHANGE_PARAMETER_INPUT,
      payload: inputData,
    });
};

export const handleDemandParamInputChange = (event) => (dispatch) => {
    const { name, value } = event.target;
    const inputData = {
      name,
      value,
    };
    dispatch({
      type: CHANGE_DEMAND_PARAM_INPUT,
      payload: inputData,
    });
};

export const handleDemandParamDateChange = (inputData) => (dispatch) => {
  dispatch({
    type: CHANGE_DEMAND_PARAM_INPUT,
    payload: inputData,
  });
}
export const handlePagingParameterChange = (inputData) => (dispatch) => {
  dispatch({
    type: CHANGE_PAGING_PARAMETER,
    payload: inputData,
  });
}
export const setPagingTotalCount = (value) => (dispatch) => {
  dispatch({
    type: PAGING_TOTAL_COUNT,
    payload: value,
  });
}