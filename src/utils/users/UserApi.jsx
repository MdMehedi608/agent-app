import FetchApi from '../index';
export const userLogin = async (userData) => {
    try {
      const { data } = await FetchApi.post(`UserAgent/UserLogin`, userData);
      return data;
    } catch (error) {
        if (error.response) {
        //   console.log(err.response.status)
            return error.response.data;
        }
    }
};

export const checkPassword = async (userData) => {
    try {
        const {data} = await FetchApi.post(`UserAgent/CheckPassword`, userData);
        return data;
    } catch (error) {
       if (error.response) {
        //   console.log(err.response.status)
          return error.response.data;
       }
    }
};

export const userChangePassword = async (userData) => {
    try {
        debugger
        const {data} = await FetchApi.post(`UserAgent/UserChangePassword`, userData);
        return data;
    } catch (error) {
       if (error.response) {
        //   console.log(err.response.status)
          return error.response.data;
       }
    }
};