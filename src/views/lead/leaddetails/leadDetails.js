import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
// import GetByIdRequest from 'commonRequest/getByIdRequest';
import moment from 'moment';
// import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
  display: 'flex', // Add display flex to the CardHeader
  justifyContent: 'center',
  padding: '15px',
  backgroundColor: '#070d59'
};
const LeadDetails = ({ selectedLead }) => {
  // getleadbyid;
  // const [studentData, setStudentData] = useState([]);
  // useEffect(() => {
  //   getStudentById(selectedLead._id);
  // }, []);
  // const getStudentById = async (id) => {
  //   const response = await GetByIdRequest('/student/getleadbyid/', id);
  //   setStudentData(response.data);
  // };

  const theme = useTheme();
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} mb={2}>
            <Card
              sx={{
                borderColor: theme.palette.primary[200] + 25,
                boxShadow: '0 4px 20px 0 rgb(4 8 10 / 20%)'
              }}
            >
              {/* card header and action */}
              <CardHeader
                sx={headerSX}
                title={
                  <Typography variant="h4" color="#ffffff">
                    Lead Information
                  </Typography>
                }
              ></CardHeader>

              {/* content & header divider */}
              <Divider />

              {/* card content */}
              <CardContent>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Name
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {selectedLead.student_name}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Phone
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {selectedLead.phone}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Email Addresss
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {selectedLead.email}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Reference By
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {selectedLead.referenceDetails?.reference_name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderColor: theme.palette.primary[200] + 25,
                boxShadow: '0 4px 20px 0 rgb(4 8 10 / 20%)'
              }}
            >
              {/* card header and action */}
              <CardHeader
                sx={headerSX}
                title={
                  <Typography variant="h4" color="#ffffff">
                    General Information
                  </Typography>
                }
              ></CardHeader>

              {/* content & header divider */}
              <Divider />

              {/* card content */}
              <CardContent>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Created Date
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {moment(selectedLead.createdAt).format('MM-DD-YYYY HH:mm')}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Follow Up Date
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    lad Information
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Status
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1} textTransform={'capitalize'}>
                    {selectedLead.leadstatus}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Created By
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {selectedLead.userDetails.user_name}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #8684841f' }}>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Assign To
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {selectedLead.assigneeDetails && selectedLead.assigneeDetails.user_name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LeadDetails;
