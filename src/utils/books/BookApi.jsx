import authHeader from '../../hooks/authHeader';
import FetchApi from '../index';

export const getAllBookInfo = async (bookParam) => {
    try {
        authHeader()
        const {data} = await FetchApi.post(`Book/GetAllBookInfo`, bookParam);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};

export const GetBookDetailsByCode = async (bookCode) => {
    try {
        const {data} = await FetchApi.get(`Book/GetBookDetailsByCode/${bookCode}`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};

export const getAllBrandList = async () => {
    try {
        const {data} = await FetchApi.get(`Book/GetAllBrandList`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};
export const getAllEditionList = async () => {
    try {
        const {data} = await FetchApi.get(`Book/GetAllEditionList`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};
export const getAllClassList = async () => {
    try {
        const {data} = await FetchApi.get(`Book/GetAllClassList`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};

export const getAllGroupList = async () => {
    try {
        const {data} = await FetchApi.get(`Book/GetAllGroupList`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};