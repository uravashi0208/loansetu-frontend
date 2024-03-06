// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/login',
          target: true
        },
        {
          id: 'register',
          title: 'Register',
          type: 'item',
          url: '/register',
          target: true
        },
        {
          id: 'forgot-password',
          title: 'Forgot Password',
          type: 'item',
          url: '/forgot-password',
          target: true
        },
        {
          id: 'otp',
          title: 'Otp Page',
          type: 'item',
          url: '/otp',
          target: true
        },
        {
          id: 'reset-password',
          title: 'Reset Password',
          type: 'item',
          url: '/reset-password',
          target: true
        }
      ]
    }
  ]
};

export default pages;
