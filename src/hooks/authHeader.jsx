import { store } from "../redux/store";
import FetchApi from "../utils/index";

export default function authHeader() {
  const { storageStore } = store.getState();
  const { user } = storageStore;

  // Set the AUTH token for any request
  if (user !== null) {
    FetchApi.interceptors.request.use(function (config) {
      if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }
}
