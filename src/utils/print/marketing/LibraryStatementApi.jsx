import FetchApi from '../../index';

export const getLibraryStatementReport = async (reportParam) => {
    try {
        const {data} = await FetchApi.post(`LibraryStatement/GetLibraryStatementReport`, reportParam);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};

export const getAllZila = async () => {
    try {
        const {data} = await FetchApi.get(`LibraryStatement/GetAllZila`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};


export const getLibraryInfoByZila = async (zilaCode) => {
    try {
        const {data} = await FetchApi.get(`LibraryStatement/GetLibraryInfoByZila/${zilaCode}`);
        return data;
    } catch (error) {
       if (error.response) {
          return error.response.data;
       }
    }
};