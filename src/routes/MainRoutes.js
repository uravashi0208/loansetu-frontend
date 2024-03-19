import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));


// sample page routing
const Profile = Loadable(lazy(() => import('views/Profile/index')));

const Staff = Loadable(lazy(() => import('views/staff/index')));
const AddStaff = Loadable(lazy(() => import('views/staff/AddStaff')));
const BranchLocation = Loadable(lazy(() => import('views/settings/branchLocation/index')));
const AddEditBranchLocation = Loadable(lazy(() => import('views/settings/branchLocation/AddBranchLocation')));
const Lead = Loadable(lazy(() => import('views/lead/index')));
const AddEditLead = Loadable(lazy(() => import('views/lead/addLead')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'staff',
      children: [
        {
          path: '',
          element: <Staff />
        }
      ]
    },
    {
      path: 'staff',
      children: [
        {
          path: 'addstaff',
          element: <AddStaff />
        }
      ]
    },
    {
      path: 'setting/branchlocation',
      children: [
        {
          path: '',
          element: <BranchLocation />
        }
      ]
    },
    {
      path: 'setting/branchlocation',
      children: [
        {
          path: 'addbranchlocation',
          element: <AddEditBranchLocation />
        }
      ]
    },
    {
      path: 'lead',
      children: [
        {
          path: '',
          element: <Lead />
        }
      ]
    },
    {
      path: 'lead',
      children: [
        {
          path: 'addeditstaff',
          element: <AddEditLead />
        }
      ]
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
