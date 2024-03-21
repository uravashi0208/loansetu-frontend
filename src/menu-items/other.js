// assets
import { IconUsers, IconLadder } from '@tabler/icons-react';

// constant
const icons = { IconUsers, IconLadder };

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
      icon: icons.IconLadder,
      breadcrumbs: false
    }
  ]
};

export default other;
