import FetchApi from '../index';

export const addAgentDemand = async (orderdata) => {
    try {
        const {data} = await FetchApi.post(`AgentDemand/AddAgentDemand`, orderdata);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};

export const getAllDemandInfo = async (params) => {
    try {
        const {data} = await FetchApi.post(`AgentDemand/GetAllDemandInfo`, params);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};
export const getDemandDetailsByNo = async (params) => {
    try {
        const {data} = await FetchApi.get(`AgentDemand/GetDemandDetailsByNo/${params}`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};