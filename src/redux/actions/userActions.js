import { CHANGE_PASSWORD_INPUT, CHANGE_USER_INPUT, SET_ERROR, SET_USER_ERROR } from "../contants/action-type";

export const handleUserInputChange = (event) => (dispatch) => {
    const { name, value } = event.target;
    const inputData = {
      name,
      value,
    };
    dispatch({
      type: CHANGE_USER_INPUT,
      payload: inputData,
    });
};
export const handleUserErrorChange = (event) => (dispatch) => {
  const { name, value } = event.target;
  const inputData = {
    name,
    value,
  };
  dispatch({
    type: SET_USER_ERROR,
    payload: inputData,
  });
};

export const handlePasswordInputChange = (event) => (dispatch) => {
    const { name, value } = event.target;
    const inputData = {
      name,
      value,
    };
    dispatch({
      type: CHANGE_PASSWORD_INPUT,
      payload: inputData,
    });
};
export const handlePasswordErrorChange = (event) => (dispatch) => {
    const { name, value } = event.target;
    const inputData = {
      name,
      value,
    };
    dispatch({
      type: SET_ERROR,
      payload: inputData,
    });
};
