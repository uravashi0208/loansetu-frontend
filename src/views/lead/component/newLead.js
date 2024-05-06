// material-ui
import { Button, Tooltip } from '@mui/material';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import { IconFileDescription } from '@tabler/icons-react';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import LeadDialog from '../dialog/leaddialog';
import moment from 'moment';
import StudentDetails from '../dialog/studentDetails';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const NewLead = ({ userData }) => {
  const [leadData, setLeadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState([]);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
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
      field: 'userDetails.user_name || userDetails.company_name',
      headerName: 'Created By',
      width: 150,
      valueGetter: (params) => (params.row.userDetails ? params.row.userDetails.user_name || params.row.userDetails.company_name || '' : '')
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      width: 170,
      valueGetter: (params) => moment(params.row.createdAt).format('MM-DD-YYYY hh:mm A')
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
            <Tooltip title="Lead Details">
              <Button
                onClick={() => handleOpenDialog(params.row)}
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
                <IconEye />
              </Button>
            </Tooltip>

            <Tooltip title="Student Details">
              <Button
                onClick={() => handleOpenStudentDialog(params.row)}
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
                <IconFileDescription />
              </Button>
            </Tooltip>
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
    const response = await GetRequestOnRole('/student/getnewlead/', userid);
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

  const handleOpenStudentDialog = (lead) => {
    setSelectedLead(lead);
    setOpenStudentDialog(true);
  };

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false);
  };

  return (
    <>
      <CommonTable rows={leadData} columns={columns} isloading={loading} />
      <LeadDialog open={openDialog} handleClose={handleCloseDialog} selectedLead={selectedLead} />
      <StudentDetails open={openStudentDialog} handleClose={handleCloseStudentDialog} selectedLead={selectedLead} />
    </>
  );
};

export default NewLead;
