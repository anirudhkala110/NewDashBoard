import { useUser } from './context/UserContext';
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
    id: 'users',
    subheader: 'Users',
    path: paths.users,
    icon: 'mingcute:user-2-fill',
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
    subheader: 'User Information',
    path: paths.user_info,
    icon: 'mingcute:safe-lock-fill',
  },
  {
    id: 'account-settings',
    subheader: 'Your Account',
    path: paths.user_info,
    icon: 'material-symbols:settings-rounded',
  },
];

export default sitemap;
