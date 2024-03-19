// assets
import { IconLocation } from '@tabler/icons-react';

// constant
const icons = {
  IconLocation
};

// ==============================|| SETTINGS MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'branchlocations',
      title: 'Branch Location',
      type: 'item',
      url: '/setting/branchlocation',
      icon: icons.IconLocation,
      breadcrumbs: false
    }
  ]
};

export default settings;
