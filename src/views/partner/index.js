// material-ui
import { Grid, Box, Button, Tooltip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router';
import DeleteRequest from 'commonRequest/deleteRequest';
import GetRequest from 'commonRequest/getRequest';

const StyledTooltip = styled('div')({
  cursor: 'pointer'
});
// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Partner = () => {
  const [partnerData, setPartnerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'student_name',
      headerName: 'Partner Code',
      width: 180,
      sortable: false,
      valueGetter: (params) => `${params.row.student_name || ''}`
    },
    {
      field: 'student_name',
      headerName: 'Company name',
      width: 180,
      sortable: false,
      valueGetter: (params) => `${params.row.student_name || ''}`
    },
    {
      field: 'student_name',
      headerName: 'Partner name',
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
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
            <Tooltip title="Update Partner">
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
            </Tooltip>
            <Tooltip title="Delete Partner">
              <Button
                onClick={() => handleDelete(params.row._id)}
                size="small"
                style={{ width: '40px', minWidth: '40px', height: '40px', border: '1px solid rgb(220 220 220)', borderRadius: '5px' }}
                color="error"
              >
                <DeleteOutlinedIcon />
              </Button>
            </Tooltip>
          </div>
        </>
      )
    }
  ];

  useEffect(() => {
    getAllPartner();
  }, []);

  const getAllPartner = async () => {
    setLoading(true);
    const response = await GetRequest('/partner/getallPartner');
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index }));
      setPartnerData(modifiedData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    navigate('/customer/editcustomer', { state: id });
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
        const response = await DeleteRequest('/partner/deletepartner/', id);
        if (response.response == true) {
          showAlert(response.message, 'success');
          setTimeout(() => {
            getAllPartner();
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
          <MainCard title={'Partners'} subtitle={true} buttonname={'Add New Partner'} redirectlink={'addeditpartner'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={partnerData} columns={columns} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Partner;
