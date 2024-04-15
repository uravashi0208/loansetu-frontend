// material-ui
import { Button } from '@mui/material';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import { IconEye } from '@tabler/icons-react';
import LeadDialog from '../dialog/leaddialog';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const CancelLead = ({ userData }) => {
  const [leadData, setLeadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState([]);
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
            <Button onClick={() => handleOpenDialog(params.row)}>
              <IconEye />
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

  const handleOpenDialog = (lead) => {
    setSelectedLead(lead);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <CommonTable rows={leadData} columns={columns} isloading={loading} />
      <LeadDialog open={openDialog} handleClose={handleCloseDialog} selectedLead={selectedLead} />
    </>
  );
};

export default CancelLead;