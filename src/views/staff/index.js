// material-ui
import { Grid, Box  } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import config from '../../config';
import { useEffect } from 'react';
import GetRequest from 'commonRequest/getRequest';

// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const Staff = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Full name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'age',
      headerName: 'Role',
      width: 100,
    },
    {
      field: 'fullName',
      headerName: 'Last Login',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      valueGetter: (params) =>
        `${params.row.firstName || ''}`,
    },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  useEffect(async () => {
    let tokenValue;
    if (localStorage.getItem("token")) {
      tokenValue = localStorage.getItem("token");
    }
    let token_value = JSON.parse(tokenValue)
    const response = await GetRequest(
      `${config.backendUrl}/getstaff`,
      {
        Authorization: `Bearer ${token_value.token}`,
      }
    );
    console.log("response :",response);
  }, []); 

  // const response = await PostRequest(
  //   `${config.backendUrl}/updateprofile`,
  //   {
  //     email: values.email,
  //     user_name: values.user_name,
  //     userId: userData?.data?._id,
  //   },
  //   {
  //     Authorization: `Bearer ${userData.token}`,
  //   }
  // );

  const rows = [
    { id: 1,status:'InActive',email:'test@gmail.com', firstName: 'Jon', age: 35 },
    { id: 2,status:'InActive',email:'test@gmail.com', firstName: 'Cersei', age: 42 },
    { id: 3,status:'InActive',email:'test@gmail.com', firstName: 'Jaime', age: 45 },
    { id: 4,status:'InActive',email:'test@gmail.com', firstName: 'Arya', age: 16 },
    { id: 5,status:'InActive',email:'test@gmail.com', firstName: 'Daenerys', age: null },
    { id: 6,status:'InActive',email:'test@gmail.com', firstName: null, age: 150 },
    { id: 7,status:'InActive',email:'test@gmail.com', firstName: 'Ferrara', age: 44 },
    { id: 8,status:'InActive',email:'test@gmail.com', firstName: 'Rossini', age: 36 },
    { id: 9,status:'InActive',email:'test@gmail.com', firstName: 'Harvey', age: 65 },
  ];

  return(
    <Grid container>
      <Grid item xs={12}>
        <MainCard title={'Staff Details'} subtitle={true} buttonname={'Add New Staff'} redirectlink={'addstaff'}>
          <Box sx={{ width: '100%', typography: 'subtitle1' }}>
            <CommonTable rows={rows} columns={columns} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  )
};

export default Staff;
