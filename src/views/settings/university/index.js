// material-ui
import { Grid, Box, Button, Tooltip } from '@mui/material';
import GetRequest from 'commonRequest/getRequest';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Swal from 'sweetalert2';
import DeleteRequest from 'commonRequest/deleteRequest';
import { useNavigate } from 'react-router';
import { useAlert } from 'ui-component/alert/alert';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const University = () => {
  const [universityData, setUniversityData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 100, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'country_name',
      headerName: 'Country name',
      width: 150,
      sortable: false,
      valueGetter: (params) => `${params.row.country_name || ''}`
    },
    {
      field: 'university_name',
      headerName: 'University name',
      width: 550,
      sortable: false,
      valueGetter: (params) => `${params.row.university_name || ''}`
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
            <Tooltip title="Edit">
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
            <Tooltip title="Delete">
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
    getAllUniversity();
  }, []);

  const getAllUniversity = async () => {
    setLoading(true);
    const response = await GetRequest('/university/getuniversity');
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index }));
      setUniversityData(modifiedData);
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    navigate('/setting/university/adduniversity', { state: id });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this details!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteRequest('/university/deleteuniversity/', id);
        if (response.response == true) {
          showAlert(response.message, 'success');
          setTimeout(() => {
            getAllUniversity();
            setLoading(false);
          }, 1000);
        } else {
          setLoading(false);
          s;
          showAlert(response.message, 'error');
        }
      }
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MainCard title={'University'} subtitle={true} buttonname={'Add New University'} redirectlink={'adduniversity'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={universityData} columns={columns} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <AlertComponent />
    </>
  );
};

export default University;
