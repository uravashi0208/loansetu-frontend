// assets
import { IconLocation, IconStatusChange, IconBackpack } from '@tabler/icons-react';

// constant
const icons = {
  IconLocation,
  IconStatusChange,
  IconBackpack
};

// ==============================|| SETTINGS MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'branchlocation',
      title: 'Branch Location',
      type: 'item',
      url: '/setting/branchlocation',
      icon: icons.IconLocation,
      breadcrumbs: false
    },
    {
      id: 'leadstatus',
      title: 'Lead Status',
      type: 'item',
      url: '/setting/leadstatus',
      icon: icons.IconStatusChange,
      breadcrumbs: false
    },
    {
      id: 'university',
      title: 'University',
      type: 'item',
      url: '/setting/university',
      icon: icons.IconBackpack,
      breadcrumbs: false
    },
    {
      id: 'coursetype',
      title: 'Course Type',
      type: 'item',
      url: '/setting/coursetype',
      icon: icons.IconBackpack,
      breadcrumbs: false
    }
  ]
};

export default settings;
