// material-ui
import { Box, Button, FormControl, FormHelperText, TextField, Grid, CircularProgress } from '@mui/material';
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

const AddEditUniversity = () => {
  const [loading, setLoading] = useState(false);
  const [universityData, setUniversityData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state !== null) {
      getUniversityById(location.state);
    }
  }, []);

  const getUniversityById = async (id) => {
    const response = await GetByIdRequest('/university/getuniversitybyid/', id);
    setUniversityData(response.data);
  };

  const initialValues = {
    country_name: universityData.country_name ? universityData.country_name : '',
    university_name: universityData.university_name ? universityData.university_name : '',
    submit: null
  };

  const handleCancelClick = () => {
    navigate('/setting/university');
  };
  return (
    <>
      <MainCard title={`${universityData.length === 0 ? 'Add' : 'Edit'} University`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            country_name: Yup.string().required('Country name is required'),
            university_name: Yup.string().required('University name is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              let response;
              universityData._id
                ? (response = await UpdateRequest('/university/edituniversity/', {
                    country_name: values.country_name,
                    university_name: values.university_name,
                    id: universityData._id
                  }))
                : (response = await PostRequest('/university/adduniversity', {
                    country_name: values.country_name,
                    university_name: values.university_name
                  }));
              if (response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/setting/university');
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
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ marginBottom: '18px' }} fullWidth error={Boolean(touched.country_name && errors.country_name)}>
                      <TextField
                        id="outlined-adornment-country_name"
                        type="text"
                        value={values.country_name}
                        name="country_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Country Name"
                        error={Boolean(touched.country_name && errors.country_name)}
                        variant="outlined" // Add this line
                      />
                      {touched.country_name && errors.country_name && (
                        <FormHelperText error id="standard-weight-helper-text-country_name">
                          {errors.country_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ marginBottom: '18px' }} fullWidth error={Boolean(touched.university_name && errors.university_name)}>
                      <TextField
                        id="outlined-adornment-university_name"
                        type="text"
                        value={values.university_name}
                        name="university_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="University Name"
                        error={Boolean(touched.university_name && errors.university_name)}
                        variant="outlined" // Add this line
                      />
                      {touched.university_name && errors.university_name && (
                        <FormHelperText error id="standard-weight-helper-text-university_name">
                          {errors.university_name}
                        </FormHelperText>
                      )}
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

export default AddEditUniversity;
