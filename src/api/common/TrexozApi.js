import axios from 'axios';
import MainApi from '@/api/common/MainApi';

const { VUE_APP_MAIN_API } = process.env;
const baseURL = VUE_APP_MAIN_API;
// eslint-disable-next-line new-cap
export const trexozAxiosInstance = new axios.create({ baseURL });

export default class FirstApi extends MainApi {
  constructor() {
    super(trexozAxiosInstance);
  }
}
