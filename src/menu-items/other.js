// assets
import { IconUsers, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconUsers, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'staff',
  type: 'group',
  children: [
    {
      id: 'staff',
      title: 'Staff',
      type: 'item',
      url: '/staff',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'lead',
      title: 'Lead',
      type: 'item',
      url: '/lead',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default other;
