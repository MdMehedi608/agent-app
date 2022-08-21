
import FetchApi from '../index';

export const getAllConfirmOrderInfo = async (params) => {
    try {
        const {data} = await FetchApi.post(`AgentOrder/GetAllConfirmOrderInfo`, params);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};

export const getOrderDetailsByOrderNo = async (orderNo, demandNo) => {
    try {
        const {data} = await FetchApi.post(`AgentOrder/GetOrderDetailsByOrderNo/${orderNo}/${demandNo}`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};
