export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pagesRoot}/dashboard`,
  users: `/${rootPaths.pagesRoot}/users`,
  user_info: `/${rootPaths.pagesRoot}/user_info`,
  features: `/${rootPaths.pagesRoot}/features`,
  pricing: `/${rootPaths.pagesRoot}/pricing`,
  integrations: `/${rootPaths.pagesRoot}/integrations`,
  settings: `/${rootPaths.pagesRoot}/settings`,
  templatePages: `/${rootPaths.pagesRoot}/template-pages`,
  accountSettings: `/${rootPaths.pagesRoot}/account-settings`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  comingSoon: `/coming-soon`,
  error404: `/${rootPaths.errorRoot}/404`,
};
