import FetchApi from '../index';

export const getAllChallanOrderInfo = async (params) => {
    try {
        const {data} = await FetchApi.post(`AgentDemand/GetAllChallanOrderInfo`, params);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};