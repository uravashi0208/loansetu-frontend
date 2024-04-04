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

const AddEditLeadStatus = () => {
  const [loading, setLoading] = useState(false);
  const [leadStatus, setLeadStatus] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state !== null) {
      getLeadStatusById(location.state);
    }
  }, []);

  const getLeadStatusById = async (id) => {
    const response = await GetByIdRequest('/leadstatus/getleadstatusbyid/', id);
    setLeadStatus(response.data);
  };

  const initialValues = {
    lead_status: leadStatus.lead_status ? leadStatus.lead_status : '',
    submit: null
  };

  const handleCancelClick = () => {
    navigate('/setting/leadstatus');
  };
  return (
    <>
      <MainCard title={`${leadStatus.length === 0 ? 'Add' : 'Edit'} Lead Status`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            lead_status: Yup.string().required('Lead Status is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              let response;
              leadStatus._id
                ? (response = await UpdateRequest('/leadstatus/editleadstatus/', {
                    lead_status: values.lead_status,
                    id: leadStatus._id
                  }))
                : (response = await PostRequest('/leadstatus/addleadstatus', {
                    lead_status: values.lead_status
                  }));
              if (response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/setting/leadstatus');
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
                    <FormControl sx={{ marginBottom: '18px' }} fullWidth error={Boolean(touched.lead_status && errors.lead_status)}>
                      <TextField
                        id="outlined-adornment-lead_status"
                        type="text"
                        value={values.lead_status}
                        name="lead_status"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Lead Status"
                        error={Boolean(touched.lead_status && errors.lead_status)}
                        variant="outlined" // Add this line
                      />
                      {touched.lead_status && errors.lead_status && (
                        <FormHelperText error id="standard-weight-helper-text-lead_status">
                          {errors.lead_status}
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

export default AddEditLeadStatus;
