// material-ui
import { Box, Button, FormControl, TextField, Grid } from '@mui/material';
import { Formik } from 'formik';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const StaffPermission = () => {
  return (
    <MainCard title={'Staff Permission'}>
      <Formik>
        <form noValidate autoComplete="off">
          <Box sx={{ mb: 1 }}>
            <Grid item xs={12} mb={2}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-email-login"
                      type="text"
                      name="first_name"
                      label="First Name"
                      variant="outlined" // Add this line
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-last_name-login"
                      type="text"
                      name="last_name"
                      label="Last Name"
                      variant="outlined" // Add this line
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button disableElevation size="large" type="submit" variant="contained" color="secondary" sx={{ mr: 2 }}>
              Save
            </Button>
            <Button disableElevation size="large" type="reset" variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </form>
      </Formik>
    </MainCard>
  );
};

export default StaffPermission;
