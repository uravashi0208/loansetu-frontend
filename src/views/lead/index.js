// material-ui
import { Grid, Box, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import GetRequest from 'commonRequest/getRequest';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRequest from 'commonRequest/deleteRequest';
import Swal from 'sweetalert2';
import { useAlert } from 'ui-component/alert/alert';
import { useNavigate } from 'react-router';

const StyledTooltip = styled('div')({
  cursor: 'pointer'
});
// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const Lead = () => {
  const [staffData, setStaffData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 60, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 150,
      sortable: false,
      valueGetter: (params) => `${params.row.first_name || ''}`
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 150,
      sortable: false,
      valueGetter: (params) => `${params.row.last_name || ''}`
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      valueGetter: (params) => {
        const email = params.row.email || '';
        if (email.length > 20) {
          return `${email.substr(0, 20)}...`; // Show first 20 characters with ellipsis
        }
        return email;
      },
      renderCell: (params) => <StyledTooltip title={params.row.email}>{params.value}</StyledTooltip>
    },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    { field: 'user_status', headerName: 'Status', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
            <Button
              onClick={() => handleEdit(params.row._id)}
              size="small"
              style={{
                width: '40px',
                minWidth: '40px',
                height: '40px',
                border: '1px solid rgb(220 220 220)',
                borderRadius: '5px',
                marginRight: '6px'
              }}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              onClick={() => handleDelete(params.row._id)}
              size="small"
              style={{ width: '40px', minWidth: '40px', height: '40px', border: '1px solid rgb(220 220 220)', borderRadius: '5px' }}
              color="error"
            >
              <DeleteOutlinedIcon />
            </Button>
          </div>
        </>
      )
    }
  ];

  useEffect(() => {
    getAllStaff();
  }, []);

  const getAllStaff = async () => {
    const response = await GetRequest('/staff/getstaff');
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index, status: row.user_status }));
      setStaffData(modifiedData);
    }
  };

  const getStatusText = (status) => (status ? 'Active' : 'Inactive');
  const columnsWithStatusText = columns.map((col) =>
    col.field === 'user_status' ? { ...col, valueGetter: (params) => getStatusText(params.row.status) } : col
  );

  const handleEdit = async (id) => {
    navigate('/staff/addstaff', { state: id });
  };
  const handleDelete = (id) => {
    Swal.fire({
      // Use Swal.fire() instead of Swal()
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this details!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteRequest('/staff/deletestaff/', id);
        if (response.response == true) {
          showAlert(response.message, 'success');
          setTimeout(() => {
            getAllStaff();
          }, 1000);
        } else {
          showAlert(response.message, 'error');
        }
      }
    });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MainCard title={'Lead Details'} subtitle={true} buttonname={'Add New Lead'} redirectlink={'addeditlead'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={staffData} columns={columnsWithStatusText} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <AlertComponent />
    </>
  );
};

export default Lead;
