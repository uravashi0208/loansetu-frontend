// material-ui
import { Grid, Box, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router';
import moment from 'moment';
import GetRequestOnRole from 'commonRequest/getRequestRole';

const StyledTooltip = styled('div')({
  cursor: 'pointer'
});
// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Customer = () => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'student_name',
      headerName: 'Customer name',
      width: 180,
      sortable: false,
      valueGetter: (params) => `${params.row.student_name || ''}`
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 210,
      valueGetter: (params) => {
        const email = params.row.email || '';
        if (email.length > 20) {
          return `${email.substr(0, 20)}...`; // Show first 20 characters with ellipsis
        }
        return email;
      },
      renderCell: (params) => <StyledTooltip title={params.row.email}>{params.value}</StyledTooltip>
    },
    { field: 'phone', headerName: 'Phone Number', width: 180 },
    {
      field: 'converted_date',
      headerName: 'Converted Date',
      width: 180,
      valueGetter: (params) => moment(params.row.converted_date).format('MM-DD-YYYY hh:mm A')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
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
          </div>
        </>
      )
    }
  ];

  useEffect(() => {
    getAllCustomer();
  }, []);

  const getAllCustomer = async () => {
    const userid =
      userData.data.role === 'Admin'
        ? 'admin'
        : userData.data.staff_team === 'service'
          ? `service-${userData.data._id}`
          : userData.data._id;
    setLoading(true);
    const response = await GetRequestOnRole('/customer/getallcustomer/', userid);
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index, status: row.user_status }));
      setStaffData(modifiedData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getStatusText = (status) => (status ? 'Active' : 'Inactive');
  const columnsWithStatusText = columns.map((col) =>
    col.field === 'user_status' ? { ...col, valueGetter: (params) => getStatusText(params.row.status) } : col
  );

  const handleEdit = async (id) => {
    navigate('/staff/addstaff', { state: id });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MainCard title={'Customers'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={staffData} columns={columnsWithStatusText} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Customer;
