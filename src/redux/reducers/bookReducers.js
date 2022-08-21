import { DROPDOWN_BRAND_LIST, DROPDOWN_CLASS_LIST, DROPDOWN_EDITION_LIST, DROPDOWN_GROUP_LIST, SET_AGENT_CHALLAN_LIST, SET_AGENT_ORDER_LIST, SET_BOOK_LIST, SET_DEMAND_DETAILS, SET_DEMAND_LIST, SET_DETAILS_BOOKS } from "../contants/action-type";

const initialState = {
  bookData: {
    bookList: null,
  },
  details: null,
  demandList: [],
  agentOrderList: [],
  agentChallanList: [],
  detailsData: {
    demand: {},
    demandDetails: []
  },
  dropDownBrandList: [],
  dropDownEditionList: [],
  dropDownClassList: [],
  dropDownGroupList: []
};
export const bookReducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_BOOK_LIST:
      return { ...state, bookData: payload };
      break;
    case SET_DETAILS_BOOKS:
      return {...state, details: payload};
      break;
    case DROPDOWN_BRAND_LIST:
      return { ...state, dropDownBrandList: payload };
      break;
    case DROPDOWN_EDITION_LIST:
      return { ...state, dropDownEditionList: payload };
      break;
    case DROPDOWN_CLASS_LIST:
      return { ...state, dropDownClassList: payload };
      break;
    case DROPDOWN_GROUP_LIST:
      return { ...state, dropDownGroupList: payload };
      break;
    case SET_DEMAND_LIST:
      return { ...state, demandList: payload };
      break;
    case SET_AGENT_ORDER_LIST:
      return { ...state, agentOrderList: payload };
      break;
    case SET_AGENT_CHALLAN_LIST:
      return { ...state, agentChallanList: payload };
      break;
    case SET_DEMAND_DETAILS:
      return { ...state, detailsData: payload };
      break;
    default:
      return state;
  }
};