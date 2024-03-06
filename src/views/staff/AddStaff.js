// material-ui
import { Grid  } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import StaffProfile from './StaffProfile';

// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const AddStaff = () => {
 
  return(
    <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
                <MainCard title={'Profile'}>
                    <StaffProfile />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <MainCard title={'Permission'}>
                    sdasdsa
                </MainCard>
            </Grid>
        </Grid>
    </Grid>
  )
};

export default AddStaff;
