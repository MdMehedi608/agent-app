import axios from "axios";
import { GlobalVariable } from '../utility-class/ApiConnectionClass';

const FetchApi = () => {
  const defaultOptions = {
    baseURL: `${GlobalVariable.LOCAL_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Create instance
  let instance = axios.create(defaultOptions);
  return instance;
};
export default FetchApi();
