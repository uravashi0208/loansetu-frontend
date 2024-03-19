// material-ui
import { Grid, Box, IconButton } from '@mui/material';
import GetRequest from 'commonRequest/getRequest';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import DeleteRequest from 'commonRequest/deleteRequest';
import { useNavigate } from 'react-router';

// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const BranchLocation = () => {
  const [branchLocationData, setBranchLocationData] = useState([]);
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 100, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'location_name',
      headerName: 'Location name',
      width: 300,
      sortable: false,
      valueGetter: (params) => `${params.row.location_name || ''}`
    },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row._id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  useEffect(() => {
    getAllBranchLocation();
  }, []);

  const getAllBranchLocation = async () => {
    const response = await GetRequest('/branchlocation/getbranchlocation');
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index, status: row.status }));
      setBranchLocationData(modifiedData);
    }
  };

  const getStatusText = (status) => (status ? 'Active' : 'Inactive');
  const columnsWithStatusText = columns.map((col) =>
    col.field === 'status' ? { ...col, valueGetter: (params) => getStatusText(params.row.status) } : col
  );

  const handleEdit = async (id) => {
    navigate('/setting/branchlocation/addbranchlocation', { state: id });
    // const response = await GetByIdRequest('/branchlocation/getlocationbyid/', id);
    // console.log('response :', response);
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
        const response = await DeleteRequest('/branchlocation/delete-location/', id);
        if (response.response == true) {
          Swal.fire({
            title: 'Success',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            setTimeout(() => {
              getAllBranchLocation();
            }, 1000);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainCard title={'Branch Location'} subtitle={true} buttonname={'Add New Branch Location'} redirectlink={'addbranchlocation'}>
          <Box sx={{ width: '100%', typography: 'subtitle1' }}>
            <CommonTable rows={branchLocationData} columns={columnsWithStatusText} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default BranchLocation;
