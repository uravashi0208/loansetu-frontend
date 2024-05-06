import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import { useEffect, useState } from 'react';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const theme = useTheme();
  const [permissions, setPermissions] = useState([]);
  const tokenValue = localStorage.getItem('token');
  const roleData = JSON.parse(tokenValue);
  useEffect(() => {
    getStaffPermissionById();
  }, []);

  const getStaffPermissionById = async () => {
    const response = await GetByIdRequest('/staff/getstaffpermissionbyid/', roleData.data?._id);
    if (response.response === true) {
      const permissionsData = response.data.permissions;
      setPermissions(permissionsData);
    }
  };

  // menu list collapse & items
  const items = item.children?.map((menu) => {
    if (roleData?.data.role === 'staff' && menu.id === 'partner' && permissions[3]?.view === true) {
      return <NavItem key={menu.id} item={menu} level={1} />;
    } else if (roleData?.data.role === 'staff' && (menu.id === 'staff' || menu.id === 'partner')) {
      return null;
    } else if (
      roleData?.data.role === 'partner' &&
      (menu.id === 'staff' || menu.id === 'student' || menu.id === 'customer' || menu.id === 'partner')
    ) {
      return null;
    }
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
