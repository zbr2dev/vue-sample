export default class MainApi {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get(url, options = {}) {
    return this.axiosInstance.get(url, { ...options });
  }

  post(url, data, options = {}) {
    return this.axiosInstance.post(url, data, { ...options });
  }

  put(url, data, options = {}) {
    return this.axiosInstance.put(url, data, { ...options });
  }

  delete(url, options) {
    return this.axiosInstance.delete(url, { ...options });
  }

  setAuthHeader(token) {
    // eslint-disable-next-line no-param-reassign
    this.axiosInstance.defaults.headers.Authorization = `bearer ${token}`;
  }
}
