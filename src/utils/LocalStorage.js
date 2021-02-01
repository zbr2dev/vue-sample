const isBookingNotificationVisible = 'isBookingNotificationVisible';
const accessTokenProp = 'accessToken';
const redirectUri = 'redirectUri';

class LocalStorageApi {
  localStorage = window.localStorage;

  getBookingNotificationShowing() {
    return this.localStorage.getItem(isBookingNotificationVisible) === null;
  }

  setBookingNotification(newValue) {
    this.localStorage.setItem(isBookingNotificationVisible, newValue);
  }

  getAccessToken() {
    return this.localStorage.getItem(accessTokenProp);
  }

  setAccessToken(token) {
    this.localStorage.setItem(accessTokenProp, token);
  }

  getRedirectUri() {
    return this.localStorage.getItem(redirectUri);
  }

  setRedirectUri(uri) {
    return this.localStorage.setItem(redirectUri, uri);
  }
}

export default new LocalStorageApi();
