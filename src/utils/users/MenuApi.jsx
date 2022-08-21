import FetchApi from '../index';
export const getSiteMenuInformation = async () => {
    try {
      const { data } = await FetchApi.get(`Menu/GetSiteMenuInformation`);
      return data;
    } catch (err) {
      throw new Error(err);
    }
};