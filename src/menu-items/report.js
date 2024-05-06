// assets
import { IconReport } from '@tabler/icons-react';

// constant
const icons = {
  IconReport
};

// ==============================|| reports MENU ITEMS ||============================== //

const reports = {
  id: 'reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'leadreport',
      title: 'Lead Report',
      type: 'item',
      url: '/report/leadreport',
      icon: icons.IconReport,
      breadcrumbs: false
    }
  ]
};

export default reports;
