import { CHANGE_PASSWORD_INPUT, CHANGE_USER_INPUT, REMOVE_DEFAULT_LOGIN, SET_DEFAULT_LOGIN, SET_ERROR, SET_USER_ERROR } from "../contants/action-type";

const initialState = {
    defaultUser: null,
  userData: {
    userName: "",
    password: "",
    newPassword: "",
  },
  userErrorData: {
    userName: "",
    password: "",
  },
  passwordData: {
    userName: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  },
  errorData: {
    newPassword: "",
    password: "",
    confirmPassword: "",
  },
};
export const userReducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_DEFAULT_LOGIN:
        return { ...state, defaultUser: payload };
        break;
    case REMOVE_DEFAULT_LOGIN:
        return { ...state, defaultUser: null };
        break;
    case CHANGE_USER_INPUT:
        let userData = { ...state.userData };
        userData[payload.name] = payload.value;
        return { ...state, userData };
        break;

    case SET_USER_ERROR:
        let userErrorData = { ...state.userErrorData, [payload.name]:"" };

        switch (payload.name) {
            case "password":
                if (!payload.value) {
                    userErrorData[payload.name] = "Please enter Password.";
                }
                break;
            case "userName":
                if (!payload.value) {
                    userErrorData[payload.name] = "Please enter Username.";
                }
                break;
            default:
                break;
        }
        return { ...state, userErrorData };
        break;
            
    case CHANGE_PASSWORD_INPUT:
        let passwordData = { ...state.passwordData };
        passwordData[payload.name] = payload.value;
        return { ...state, passwordData };
        break;

    case SET_ERROR:
        let errorData = { ...state.errorData, [payload.name]:"" };

        switch (payload.name) {
            case "password":
                if (!payload.value) {
                    errorData[payload.name] = "Please enter Password.";
                }
                break;
        
            case "newPassword":
                if (!payload.value) {
                    errorData[payload.name] = "Please enter New Password.";
                } else if (state?.passwordData.confirmPassword && payload.value !== state?.passwordData.confirmPassword) {
                    errorData["confirmPassword"] = "Password and Confirm Password does not match.";
                    state.passwordData["confirmPassword"] = "";
                } else if (payload.value === 'ppl123') {
                    errorData[payload.name] = "Default password not allow.";
                    state.passwordData[payload.name] = "";
                } else {
                    errorData["confirmPassword"] = state?.passwordData.confirmPassword ? "" : state?.errorData.confirmPassword;
                }
                break;
        
            case "confirmPassword":
                if (!payload.value) {
                    errorData[payload.name] = "Please enter Confirm Password.";
                } else if (state?.passwordData.newPassword && payload.value !== state?.passwordData.newPassword) {
                    errorData[payload.name] = "Password and Confirm Password does not match.";
                    state.passwordData["confirmPassword"] = "";
                }
                break;
        
            default:
                break;
        }
        return { ...state, errorData };
        break;
    default:
        return state;
  }
};