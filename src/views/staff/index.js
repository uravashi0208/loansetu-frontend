// material-ui
import { Grid, Box, Button, Tooltip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import GetRequest from 'commonRequest/getRequest';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VrpanoIcon from '@mui/icons-material/Vrpano';
import ImageIcon from '@mui/icons-material/Image';
import DeleteRequest from 'commonRequest/deleteRequest';
import Swal from 'sweetalert2';
import { useAlert } from 'ui-component/alert/alert';
import { useNavigate } from 'react-router';

const StyledTooltip = styled('div')({
  cursor: 'pointer'
});
// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Staff = () => {
  const [staffData, setStaffData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 130,
      sortable: false,
      valueGetter: (params) => `${params.row.first_name || ''}`
    },
    { field: 'last_name', headerName: 'Last name', width: 130, sortable: false, valueGetter: (params) => `${params.row.last_name || ''}` },
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
      field: 'download',
      headerName: 'Download',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
            <Tooltip title="Download Pan Card">
              <a
                href={params.row.pan_image} // Provide the URL for the Aadhar card image
                download={params.row.pan_image} // Set the filename for the downloaded file
                style={{
                  width: '40px',
                  minWidth: '40px',
                  height: '40px',
                  border: '1px solid rgb(220 220 220)',
                  borderRadius: '5px',
                  marginRight: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'green'
                }}
              >
                <ImageIcon />
              </a>
            </Tooltip>
            {/* Download PAN Card */}
            <Tooltip title="Download Aadhar Card">
              <a
                href={params.row.aadhar_image} // Provide the URL for the Aadhar card image
                download={params.row.aadhar_image} // Set the filename for the downloaded file
                style={{
                  width: '40px',
                  minWidth: '40px',
                  height: '40px',
                  border: '1px solid rgb(220 220 220)',
                  borderRadius: '5px',
                  marginRight: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <VrpanoIcon />
              </a>
            </Tooltip>
            {/* Download Contract PDF */}
            <Tooltip title="Download Contract PDF">
              <a
                href={params.row.contract_pdf} // Provide the URL for the Aadhar card image
                download={params.row.contract_pdf} // Set the filename for the downloaded file
                style={{
                  width: '40px',
                  minWidth: '40px',
                  height: '40px',
                  border: '1px solid rgb(220 220 220)',
                  borderRadius: '5px',
                  marginRight: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'red'
                }}
              >
                <PictureAsPdfIcon />
              </a>
            </Tooltip>
          </div>
        </>
      )
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
    setLoading(true);
    const response = await GetRequest('/staff/getstaff');
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index, status: row.user_status }));
      setStaffData(modifiedData);
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
          <MainCard title={'Staff Details'} subtitle={true} buttonname={'Add New Staff'} redirectlink={'addstaff'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={staffData} columns={columnsWithStatusText} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <AlertComponent />
    </>
  );
};

export default Staff;
