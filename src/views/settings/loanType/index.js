// material-ui
import { Grid, Box, Button } from '@mui/material';
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

const Loantype = () => {
  const [loanTypeData, setLoanTypeData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 100, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'loan_type',
      headerName: 'Loan Type',
      width: 300,
      sortable: false,
      valueGetter: (params) => `${params.row.loan_type || ''}`
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
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
    getAllLoanType();
  }, []);

  const getAllLoanType = async () => {
    setLoading(true);
    const response = await GetRequest('/loantype/getloantype');
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index }));
      setLoanTypeData(modifiedData);
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    navigate('/setting/loantype/addloantype', { state: id });
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
        const response = await DeleteRequest('/loantype/deleteloantype/', id);
        if (response.response == true) {
          showAlert(response.message, 'success');
          setTimeout(() => {
            getAllLoanType();
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
          <MainCard title={'Loan Type'} subtitle={true} buttonname={'Add New Loan Type'} redirectlink={'addloantype'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={loanTypeData} columns={columns} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <AlertComponent />
    </>
  );
};

export default Loantype;
