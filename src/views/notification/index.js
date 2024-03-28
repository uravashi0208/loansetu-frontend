// material-ui
import { Grid, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import GetRequestOnRole from 'commonRequest/getRequestRole';

// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const Notification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  const columns = [
    { field: 'id', headerName: 'ID', width: 60, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'studentsDetails.user_name',
      headerName: 'Assigner Name',
      width: 300,
      valueGetter: (params) => (params.row.studentsDetails ? params.row.studentsDetails.user_name || '' : '')
    },
    { field: 'message', headerName: 'Message', width: 400 }
  ];

  useEffect(() => {
    getAllNotification();
  }, []);

  const getAllNotification = async () => {
    const userid = userData.data.role === 'Admin' ? 'admin' : userData.data._id;
    setLoading(true);
    const response = await GetRequestOnRole('/notification/getnotification/', userid);
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index }));
      setNotificationData(modifiedData);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MainCard title={'Notification'} subtitle={false}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={notificationData} columns={columns} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Notification;
