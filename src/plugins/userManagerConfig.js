const {
  VUE_APP_MANAGER_AUTHORITY_URI,
  VUE_APP_MANAGER_REDIRECT_URI,
  VUE_APP_MANAGER_POST_LOGOUT_REDIRECT_URI,
  VUE_APP_MANAGER_CLIENT_SECRET,
} = process.env;
export default {
  authority: VUE_APP_MANAGER_AUTHORITY_URI,
  client_id: 'user_web',
  client_secret: VUE_APP_MANAGER_CLIENT_SECRET,
  redirect_uri: VUE_APP_MANAGER_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid ApiOne profile offline_access',
  post_logout_redirect_uri: VUE_APP_MANAGER_POST_LOGOUT_REDIRECT_URI,
};
