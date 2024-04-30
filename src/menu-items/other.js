// assets
import { IconUsers, IconLadder, IconFilter, IconSchool, IconBellRinging, IconUsersGroup, IconUserPentagon } from '@tabler/icons-react';

// constant
const icons = { IconUsers, IconLadder, IconFilter, IconSchool, IconBellRinging, IconUsersGroup, IconUserPentagon };

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
      icon: icons.IconFilter,
      breadcrumbs: false
    },
    {
      id: 'student',
      title: 'Student',
      type: 'item',
      url: '/student',
      icon: icons.IconSchool,
      breadcrumbs: false
    },
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customer',
      icon: icons.IconUsersGroup,
      breadcrumbs: false
    },
    {
      id: 'partner',
      title: 'Partner',
      type: 'item',
      url: '/partner',
      icon: icons.IconUserPentagon,
      breadcrumbs: false
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/notification',
      icon: icons.IconBellRinging,
      breadcrumbs: false
    }
  ]
};

export default other;
