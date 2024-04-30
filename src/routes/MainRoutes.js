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
const LeadStatus = Loadable(lazy(() => import('views/settings/leadStatus/index')));
const AddEditLeadStatus = Loadable(lazy(() => import('views/settings/leadStatus/AddLeadStatus')));
const University = Loadable(lazy(() => import('views/settings/university/index')));
const AddEditUniversity = Loadable(lazy(() => import('views/settings/university/AddUniversity')));
const CourseType = Loadable(lazy(() => import('views/settings/coursetype/index')));
const AddEditCourseType = Loadable(lazy(() => import('views/settings/coursetype/AddCourseType')));
const Student = Loadable(lazy(() => import('views/student/index')));
const AddEditStudent = Loadable(lazy(() => import('views/student/addStudent')));
const Loantype = Loadable(lazy(() => import('views/settings/loanType/index')));
const AddEditLoanType = Loadable(lazy(() => import('views/settings/loanType/addLoanType')));
const Notification = Loadable(lazy(() => import('views/notification/index')));
const Customer = Loadable(lazy(() => import('views/customer/index')));
const EditStaffProfile = Loadable(lazy(() => import('views/staff/EditStaffProfile')));
const EditCustomer = Loadable(lazy(() => import('views/customer/EditCustomer')));
const Partner = Loadable(lazy(() => import('views/partner/index')));
const AddEditPartner = Loadable(lazy(() => import('views/partner/addeditPartner')));

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
      path: 'staff',
      children: [
        {
          path: 'editstaff',
          element: <EditStaffProfile />
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
          path: 'addeditlead',
          element: <AddEditLead />
        }
      ]
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'setting/leadstatus',
      children: [
        {
          path: '',
          element: <LeadStatus />
        }
      ]
    },
    {
      path: 'setting/leadstatus',
      children: [
        {
          path: 'addleadstatus',
          element: <AddEditLeadStatus />
        }
      ]
    },
    {
      path: 'setting/university',
      children: [
        {
          path: '',
          element: <University />
        }
      ]
    },
    {
      path: 'setting/university',
      children: [
        {
          path: 'adduniversity',
          element: <AddEditUniversity />
        }
      ]
    },
    {
      path: 'setting/coursetype',
      children: [
        {
          path: '',
          element: <CourseType />
        }
      ]
    },
    {
      path: 'setting/coursetype',
      children: [
        {
          path: 'addcoursetype',
          element: <AddEditCourseType />
        }
      ]
    },
    {
      path: 'student',
      children: [
        {
          path: '',
          element: <Student />
        }
      ]
    },
    {
      path: 'student',
      children: [
        {
          path: 'addeditstudent',
          element: <AddEditStudent />
        }
      ]
    },
    {
      path: 'setting/loantype',
      children: [
        {
          path: '',
          element: <Loantype />
        }
      ]
    },
    {
      path: 'setting/loantype',
      children: [
        {
          path: 'addloantype',
          element: <AddEditLoanType />
        }
      ]
    },
    {
      path: 'notification',
      children: [
        {
          path: '',
          element: <Notification />
        }
      ]
    },
    {
      path: 'customer',
      children: [
        {
          path: '',
          element: <Customer />
        }
      ]
    },
    {
      path: 'customer',
      children: [
        {
          path: 'editcustomer',
          element: <EditCustomer />
        }
      ]
    },
    {
      path: 'partner',
      children: [
        {
          path: '',
          element: <Partner />
        }
      ]
    },
    {
      path: 'partner',
      children: [
        {
          path: 'addeditpartner',
          element: <AddEditPartner />
        }
      ]
    }
  ]
};

export default MainRoutes;
