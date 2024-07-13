import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dashboard',
    path: '/',
    icon: 'mingcute:home-1-fill',
    active: true,
  },
  {
    id: 'features',
    subheader: 'Features',
    path: '#!',
    icon: 'mingcute:star-fill',
  },
  {
    id: 'users',
    subheader: 'Users',
    path: '#!',
    icon: 'mingcute:user-2-fill',
  },
  {
    id: 'pricing',
    subheader: 'Pricing',
    path: '#!',
    icon: 'mingcute:currency-dollar-2-line',
  },
  {
    id: 'integrations',
    subheader: 'Integrations',
    path: '#!',
    icon: 'mingcute:plugin-2-fill',
  },
  {
    id: 'authentication',
    subheader: 'Authentication',
    icon: 'mingcute:safe-lock-fill',
    items: [
      {
        name: 'Login',
        pathName: 'login',
        path: paths.login,
      },
      {
        name: 'Signup',
        pathName: 'signup',
        path: paths.signup,
      },
    ],
  },
  {
    id: 'user-info',
    subheader: 'user-information',
    path:'user_info',
    icon: 'mingcute:safe-lock-fill',

  },
  {
    id: 'settings',
    subheader: 'Settings',
    icon: 'material-symbols:settings-rounded',
    items: [
      {
        name: 'NA',
        path: '#!',
        pathName: 'setting-v1',
      },
      {
        name: 'NA',
        path: '#!',
        pathName: 'setting-v2',
      },
      {
        name: 'NA',
        path: '#!',
        pathName: 'setting-v3',
      },
    ],
  },
  {
    id: 'template-pages',
    subheader: 'Template pages',
    icon: 'mingcute:document-2-fill',
    items: [
      {
        name: 'Page 01',
        path: '/',
        pathName: 'page-1',
      },
      {
        name: 'Page 02',
        path: '/',
        pathName: 'page-2',
      },
      {
        name: 'Page 03',
        path: '/',
        pathName: 'page-3',
      },
    ],
  },
  {
    id: 'account-settings',
    subheader: 'Anirudh Kala',
    path: '/',
  },
];

export default sitemap;
