// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const tokenValue = localStorage.getItem('token');
  const roleData = JSON.parse(tokenValue);

  const filteredMenuItems = menuItem?.items.filter((item) => {
    if (roleData) {
      // Check if user role is 'staff ' and item is 'settings', then exclude it
      return !((roleData?.data.role === 'staff' || roleData?.data.role === 'partner') && item.id === 'settings');
    }
  });
  const navItems = filteredMenuItems?.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
