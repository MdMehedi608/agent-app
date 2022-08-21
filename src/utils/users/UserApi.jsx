import FetchApi from '../index';
export const userLogin = async (userData) => {
    try {
      const { data } = await FetchApi.post(`User/UserLogin`, userData);
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
        const {data} = await FetchApi.post(`User/CheckPassword`, userData);
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
        const {data} = await FetchApi.post(`User/UserChangePassword`, userData);
        return data;
    } catch (error) {
       if (error.response) {
        //   console.log(err.response.status)
          return error.response.data;
       }
    }
};