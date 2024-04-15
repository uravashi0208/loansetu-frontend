// material-ui
import { Grid, Box, Tab } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import NewLead from './component/newLead';
import ProcessingLead from './component/processingLead';
// import CloseByLead from './component/closeByLead';
// import ConfirmLead from './component/confirmLead';
import CancelLead from './component/CancelLead';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Lead = () => {
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MainCard title={'Lead Details'} subtitle={true} buttonname={'Add New Lead'} redirectlink={'addeditlead'}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="New Lead" value="1" />
                  <Tab label="Processing Lead" value="2" />
                  {/* <Tab label="Close By Lead" value="3" />
                  <Tab label="Confirm Lead" value="4" /> */}
                  <Tab label="Cancel Lead" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <NewLead userData={userData} />
              </TabPanel>
              <TabPanel value="2">
                <ProcessingLead userData={userData} />
              </TabPanel>
              {/* <TabPanel value="3">
                <CloseByLead userData={userData} />
              </TabPanel>
              <TabPanel value="4">
                <ConfirmLead userData={userData} />
              </TabPanel> */}
              <TabPanel value="3">
                <CancelLead userData={userData} />
              </TabPanel>
            </TabContext>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Lead;
