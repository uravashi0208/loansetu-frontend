// material-ui
import { Box, Button, FormControl, FormHelperText, TextField, Grid, FormControlLabel, Switch, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { useLocation, useNavigate } from 'react-router';
import PostRequest from 'commonRequest/postRequest';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import UpdateRequest from 'commonRequest/updateRequest';
import { useAlert } from 'ui-component/alert/alert';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const AddEditBranchLocation = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branchLocation, setBranchlocation] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state !== null) {
      getBranchById(location.state);
    }
  }, []);

  const getBranchById = async (id) => {
    const response = await GetByIdRequest('/branchlocation/getlocationbyid/', id);
    setStatus(response.data.status);
    setBranchlocation(response.data);
  };

  const initialValues = {
    location_name: branchLocation.location_name ? branchLocation.location_name : '',
    branch_address: branchLocation.branch_address ? branchLocation.branch_address : '',
    branch_pincode: branchLocation.branch_pincode ? branchLocation.branch_pincode : '',
    branch_email: branchLocation.branch_email ? branchLocation.branch_email : '',
    status: branchLocation.status ? status : false
  };

  const handleCancelClick = () => {
    navigate('/setting/branchlocation');
  };
  return (
    <>
      <MainCard title={`${branchLocation === '' ? 'Add' : 'Edit'} Branch Location`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            location_name: Yup.string().required('Location name is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              let response;
              branchLocation._id
                ? (response = await UpdateRequest('/branchlocation/editbranchlocation/', {
                    location_name: values.location_name,
                    branch_address: values.branch_address,
                    branch_pincode: values.branch_pincode,
                    branch_email: values.branch_email,
                    status: status,
                    id: branchLocation._id
                  }))
                : (response = await PostRequest('/branchlocation/addbranchlocation', {
                    location_name: values.location_name,
                    branch_address: values.branch_address,
                    branch_pincode: values.branch_pincode,
                    branch_email: values.branch_email,
                    status: status
                  }));
              if (response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/setting/branchlocation');
                }, 1000);
              } else {
                setLoading(false);
                showAlert(response.message, 'error');
              }
            } catch (err) {
              setLoading(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth error={Boolean(touched.location_name && errors.location_name)}>
                      <TextField
                        id="outlined-adornment-location_name"
                        type="text"
                        value={values.location_name}
                        name="location_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Location Name"
                        error={Boolean(touched.location_name && errors.location_name)}
                        variant="outlined" // Add this line
                      />
                      {touched.location_name && errors.location_name && (
                        <FormHelperText error id="standard-weight-helper-text-location_name">
                          {errors.location_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-branch_pincode"
                        type="text"
                        value={values.branch_pincode}
                        name="branch_pincode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Pincode"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-branch_email"
                        type="text"
                        value={values.branch_email}
                        name="branch_email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Branch Email"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-branch_address"
                        type="text"
                        value={values.branch_address}
                        name="branch_address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Branch Address"
                        rows={3}
                        variant="outlined" // Add this line
                        multiline
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ marginBottom: '18px' }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={status} // Set the checked prop to status
                            onChange={(e) => setStatus(e.target.checked)} // Update status value on change
                          />
                        }
                        label="IsActive?"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button disableElevation disabled={loading} size="large" type="submit" variant="contained" color="secondary" sx={{ mr: 2 }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
                <Button disableElevation size="large" type="reset" variant="outlined" color="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </MainCard>
      <AlertComponent />
    </>
  );
};

export default AddEditBranchLocation;
