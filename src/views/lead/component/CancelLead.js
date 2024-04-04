// material-ui
import { Button } from '@mui/material';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRequest from 'commonRequest/deleteRequest';
import Swal from 'sweetalert2';
import { useAlert } from 'ui-component/alert/alert';
import { useNavigate } from 'react-router';
import GetRequestOnRole from 'commonRequest/getRequestRole';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const CancelLead = ({ userData }) => {
  const [leadData, setLeadData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 60, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'student_name',
      headerName: 'Student name',
      width: 150,
      sortable: false,
      valueGetter: (params) => `${params.row.student_name || ''}`
    },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    {
      field: 'userDetails.user_name',
      headerName: 'Created By',
      width: 150,
      valueGetter: (params) => (params.row.userDetails ? params.row.userDetails.user_name || '' : '')
    },
    { field: 'country', headerName: 'Country', width: 150 },
    {
      field: 'loantypeDetails.loan_type',
      headerName: 'Loan Type',
      width: 200,
      valueGetter: (params) => (params.row.loantypeDetails ? params.row.loantypeDetails.loan_type || '' : '')
    },
    {
      field: 'universityDetails.university_name',
      headerName: 'University',
      width: 300,
      valueGetter: (params) => (params.row.universityDetails ? params.row.universityDetails.university_name || '' : '')
    },
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
    getAllLead();
  }, []);

  const getAllLead = async () => {
    const userid = userData.data.role === 'Admin' ? 'admin' : userData.data._id;
    setLoading(true);
    const response = await GetRequestOnRole('/student/getcancellead/', userid);
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index }));
      setLeadData(modifiedData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    navigate('/lead/addeditlead', { state: id });
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
            getAllLead();
          }, 1000);
        } else {
          showAlert(response.message, 'error');
        }
      }
    });
  };

  return (
    <>
      <CommonTable rows={leadData} columns={columns} isloading={loading} />
      <AlertComponent />
    </>
  );
};

export default CancelLead;
