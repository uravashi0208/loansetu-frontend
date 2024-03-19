// material-ui
import { Grid  } from '@mui/material';
import { gridSpacing } from 'store/constant';
import StaffProfile from './StaffProfile';
import StaffPermission from './StaffPermission';

// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const AddStaff = () => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={12}>
          <StaffProfile />
        </Grid>
        <Grid item xs={12} md={12}>
          <StaffPermission />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddStaff;
