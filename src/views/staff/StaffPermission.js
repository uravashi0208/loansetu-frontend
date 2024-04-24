// material-ui
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import UpdateRequest from 'commonRequest/updateRequest';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAlert } from 'ui-component/alert/alert';
import MainCard from 'ui-component/cards/MainCard';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const StaffPermission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({
    0: { add: false, update: false, delete: false, view: false },
    1: { add: false, update: false, delete: false, view: false },
    2: { add: false, update: false, delete: false, view: false },
    3: { add: false, update: false, delete: false, view: false }
  });

  useEffect(() => {
    if (location && location.state !== null) {
      getStaffPermissionById(location.state);
    }
  }, []);

  const getStaffPermissionById = async (id) => {
    const response = await GetByIdRequest('/staff/getstaffpermissionbyid/', id);
    if (response.response === true) {
      const permissionsData = response.data.permissions;
      setPermissions((prevPermissions) => {
        return {
          ...prevPermissions,
          ...permissionsData
        };
      });
    }
  };

  const handleCheckboxChange = (event, role) => {
    const { name, checked } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: {
        ...prevPermissions[role],
        [name]: checked
      }
    }));
  };

  const handleSubmit = async () => {
    const response = await UpdateRequest('/staff/editstaffpermission/', {
      permissions: permissions,
      id: location.state
    });
    if (response && response.response === true) {
      showAlert(response.message, 'success');
      setTimeout(() => {
        setLoading(false);
        navigate('/staff');
      }, 1000);
    } else {
      setLoading(false);
      showAlert(response.message, 'error');
    }
  };

  const roleNames = {
    0: 'Staff',
    1: 'Lead',
    2: 'Customer',
    3: 'Partner'
  };

  return (
    <>
      <MainCard title={'Staff Permission'}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell align="center">Add</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(permissions).map((role) => (
                <TableRow key={role}>
                  <TableCell component="th" scope="row">
                    {roleNames[role]}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={permissions[role].add} onChange={(e) => handleCheckboxChange(e, role)} name="add" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={permissions[role].update} onChange={(e) => handleCheckboxChange(e, role)} name="update" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={permissions[role].delete} onChange={(e) => handleCheckboxChange(e, role)} name="delete" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={permissions[role].view} onChange={(e) => handleCheckboxChange(e, role)} name="view" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2 }}>
          <Button
            disableElevation
            disabled={loading}
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mr: 2 }}
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
          <Button disableElevation size="large" variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </MainCard>
      <AlertComponent />
    </>
  );
};

export default StaffPermission;
