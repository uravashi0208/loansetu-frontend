import { Grid, Box, Tab  } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import ProfileDetails from './ProfileDetail';
import ChangePassword from './ChangePassword';

const Profile = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <MainCard title={'Account Setting'}>
                    <Box sx={{ width: '100%', typography: 'subtitle1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Profile" value="1" />
                                    <Tab label="Security" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><ProfileDetails /></TabPanel>
                            <TabPanel value="2"><ChangePassword /></TabPanel>
                        </TabContext>
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
     );
};

export default Profile;