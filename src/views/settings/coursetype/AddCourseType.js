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

const AddEditCourseType = () => {
  const [loading, setLoading] = useState(false);
  const [courseType, setCourseType] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state !== null) {
      getCourseTypeById(location.state);
    }
  }, []);

  const getCourseTypeById = async (id) => {
    const response = await GetByIdRequest('/coursetype/getcoursetypebyid/', id);
    setCourseType(response.data);
  };

  const initialValues = {
    course_type_name: courseType.course_type_name ? courseType.course_type_name : '',
    submit: null
  };

  const handleCancelClick = () => {
    navigate('/setting/coursetype');
  };
  return (
    <>
      <MainCard title={`${courseType.length === 0 ? 'Add' : 'Edit'} Course Type`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            course_type_name: Yup.string().required('Course Type is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              let response;
              courseType._id
                ? (response = await UpdateRequest('/coursetype/editcoursetype/', {
                    course_type_name: values.course_type_name,
                    id: courseType._id
                  }))
                : (response = await PostRequest('/coursetype/addcoursetype', {
                    course_type_name: values.course_type_name
                  }));
              if (response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/setting/coursetype');
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
                    <FormControl
                      sx={{ marginBottom: '18px' }}
                      fullWidth
                      error={Boolean(touched.course_type_name && errors.course_type_name)}
                    >
                      <TextField
                        id="outlined-adornment-course_type_name"
                        type="text"
                        value={values.course_type_name}
                        name="course_type_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Course Type"
                        error={Boolean(touched.course_type_name && errors.course_type_name)}
                        variant="outlined" // Add this line
                      />
                      {touched.course_type_name && errors.course_type_name && (
                        <FormHelperText error id="standard-weight-helper-text-course_type_name">
                          {errors.course_type_name}
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

export default AddEditCourseType;
