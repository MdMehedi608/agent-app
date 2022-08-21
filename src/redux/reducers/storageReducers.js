import { ADD_CART, ADD_CART_PRICE, LOGOUT, ORDER_CONFIRM, SET_CART_LIST, SET_LOGIN, SET_SESSION_CHILD_MENU, SET_SESSION_PARENT_MENU } from "../contants/action-type";

const initialState = {
  user: null,
  childMenu: {
    isActiveMenuId: 0
  },
  parentMenu: {
    isExpanded: 'demand'    
  },
  cart: 0,
  cartTotalPrice:0,
  agentDemand: {   
    demandDetails: []
  },
  newAgenetDemand: {
    id: 0,
    demandNo: "",
    demandDate: null,
    orderApproved: 0,
    orderSend: false,
    orderDiscount: 0,
    orderBy: "",
    entryDateString: "",
    addDateString: "",
    addUserId: "",
    editDate: null,
    editUserId: "",
    concern: "PPL",
    totalQty: 0,
    totalAmount: 0,
  },
  newDemandDetails: {
    id: 0,
    demandNo: "",
    bookName: "",
    bookCode: "",
    bookType: "",
    demandQty: 0,
    bookPrice: 0,
    demandAmount: 0
  }
};
export const storageReducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_LOGIN:
      return { ...state, user: payload };
      break;
    case SET_SESSION_CHILD_MENU:
      return { ...state, childMenu: payload };
    case SET_SESSION_PARENT_MENU:
      return { ...state, parentMenu: payload };
      break;
    case SET_CART_LIST:
      return { ...state, agentDemand: payload };
      break;
    case ORDER_CONFIRM:
      return { ...state, 
        agentDemand: {
          ...state.newAgenetDemand,
          demandDetails: []          
        },
        cart: 0,
        cartTotalPrice:0,
    };
      break;
    case ADD_CART:
      return { ...state, cart: payload };
      break;
    case ADD_CART_PRICE:
      return { ...state, cartTotalPrice: payload };
      break;
    case LOGOUT:
      return { ...state, 
        user: null, 
        parentMenu: {
          isExpanded: 'demand'
        }, 
        childMenu: {
          isActiveMenuId: 0
        },
        // agentDemand: {
        //   ...state.newAgenetDemand,
        //   demandDetails: []
        // },
        // cart: 0,
        // cartTotalPrice:0,
      };
      break;
    default:
      return state;
  }
};
