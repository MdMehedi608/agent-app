import { CHANGE_DEMAND_PARAM_INPUT, CHANGE_PAGING_PARAMETER, CHANGE_PARAMETER_INPUT, PAGING_TOTAL_COUNT, SET_DEMAND_PARAMETER, SET_LOADING, SET_PARAMETER } from "../contants/action-type";

const initialState = {
  loading: false,
  bookParameter: {
    commonId: "",
    searchName: "",
    page: 1,
    pageSize: 100,
    editionId: "2022",
    brandId: "PPL",
    classId: "E",
    group: ""
  },
  demandParameter: {
    demandDate: "",
    commonId: 0,
    searchName: "",
  },
  totalcount: 0,
  pagingParameter: {
    page: 1,
    pageSize: 10,
    totalcount: 0,
  }
};
export const commonReducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case CHANGE_PARAMETER_INPUT:
        let bookParameter = { ...state.bookParameter };
        bookParameter[payload.name] = payload.value;
        return { ...state, bookParameter };
        break;

    case CHANGE_DEMAND_PARAM_INPUT:
        let demandParameter = { ...state.demandParameter };
        demandParameter[payload.name] = payload.value;
        return { ...state, demandParameter };
        break;

    case SET_PARAMETER:
      return { ...state, bookParameter: payload };
      break;

    case SET_DEMAND_PARAMETER:
      return { ...state, demandParameter: payload };
      break;

    case CHANGE_PAGING_PARAMETER:
      let pagingParameter = { ...state.pagingParameter };
      pagingParameter[payload.name] = payload.value;
      return { ...state, pagingParameter };
      break;

    case PAGING_TOTAL_COUNT:
      return { ...state, totalcount: payload };
      break;

    case SET_LOADING:
      return { ...state, loading: payload };
      break;

    default:
        return state;
  }
};