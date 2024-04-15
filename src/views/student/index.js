// material-ui
import { Grid, Box, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRequest from 'commonRequest/deleteRequest';
import Swal from 'sweetalert2';
import { useAlert } from 'ui-component/alert/alert';
import { useNavigate } from 'react-router';
import GetRequestOnRole from 'commonRequest/getRequestRole';

const StyledTooltip = styled('div')({
  cursor: 'pointer'
});
// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Studentss = () => {
  const [studentData, setStudentData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  const columns = [
    { field: 'id', headerName: 'ID', width: 60, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'student_name',
      headerName: 'Student name',
      width: 150,
      sortable: false,
      valueGetter: (params) => `${params.row.student_name || ''}`
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
    { field: 'phone', headerName: 'Phone Number', width: 150 },
    {
      field: 'universityDetails.university_name',
      headerName: 'University',
      width: 300,
      valueGetter: (params) => (params.row.universityDetails ? params.row.universityDetails.university_name || '' : '')
    },
    { field: 'course_name', headerName: 'Course Name', width: 150 },
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
    getAllStudent();
  }, []);

  const getAllStudent = async () => {
    const userid = userData.data.role === 'Admin' ? 'admin' : userData.data._id;
    setLoading(true);
    const response = await GetRequestOnRole('/student/getstudent/', userid);
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index }));
      setStudentData(modifiedData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    navigate('/student/addeditstudent', { state: id });
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
        const response = await DeleteRequest('/student/deletestudent/', id);
        if (response.response == true) {
          showAlert(response.message, 'success');
          setTimeout(() => {
            getAllStudent();
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
          <MainCard title={'Students'} subtitle={true} buttonname={'Add New Student'} redirectlink={'addeditstudent'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={studentData} columns={columns} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <AlertComponent />
    </>
  );
};

export default Studentss;
