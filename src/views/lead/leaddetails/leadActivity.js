import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PostRequest from 'commonRequest/postRequest';
import { useAlert } from 'ui-component/alert/alert';

const LeadActivity = ({ selectedLead }) => {
  const [leadActivityLogData, setLeadActivityLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showAlert, AlertComponent } = useAlert();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);

  useEffect(() => {
    getAllLeadActivityLog();
  }, []);

  const timeDifference = (previous) => {
    const current = new Date();
    const previousDate = new Date(previous);

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previousDate;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' sec ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' min ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hrs ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' day ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  };

  const getAllLeadActivityLog = async () => {
    const leadid = selectedLead._id;
    setLoading(true);
    const response = await GetRequestOnRole('/leadactivity/getleadActivityLog/', leadid);
    if (response.data) {
      const formatted = response.data.map((activitylog) => ({
        ...activitylog,
        timeAgo: timeDifference(activitylog.createdAt)
      }));
      setLeadActivityLogData(formatted);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const initialValues = {
    activity_log_details: ''
  };
  return (
    <>
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : leadActivityLogData.length > 0 ? (
        <Card>
          <Divider />
          <CardContent className="lead_activity_content">
            <Grid container spacing={gridSpacing} className="lead_activity_cls">
              {leadActivityLogData.map((leadFollowUp, index) => (
                <Grid item xs={12} md={12} lg={12} className="lead_activity_item" key={index}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Grid container spacing={2} className="lead_activity_subitem">
                        <Grid item xs={true}>
                          <Typography variant="caption">{leadFollowUp.timeAgo}</Typography>
                        </Grid>
                        <Grid item>
                          <Avatar alt={leadFollowUp.userDetails.authorised_person_name} src="/static/images/avatar/1.jpg" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Typography variant="subtitle1">{leadFollowUp.userDetails.authorised_person_name}</Typography>
                          <Typography variant="subtitle2">{leadFollowUp.activity_log_details}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ width: '100%', typography: 'subtitle1', textAlign: 'center' }}>No Data found</Box>
      )}

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          activity_log_details: Yup.string().required('Next Folloup Date is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setLoading(true);
            let response = await PostRequest('/leadactivity/addleadActivityLog', {
              student_id: selectedLead._id,
              staff_id: userData.data._id,
              activity_log_details: values.activity_log_details
            });
            if (response.response === true) {
              showAlert(response.message, 'success');
              getAllLeadActivityLog();
              setLoading(false);
            } else {
              setLoading(false);
              showAlert(response.message, 'error');
            }
          } catch (err) {
            console.log('err', err);
            setLoading(false);
          } finally {
            setSubmitting(false); // Ensure form submission state is updated
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={12} lg={12}>
                  <FormControl fullWidth error={Boolean(touched.activity_log_details && errors.activity_log_details)}>
                    <TextField
                      id="outlined-adornment-activity_log_details"
                      value={values.activity_log_details}
                      name="activity_log_details"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined" // Add this line
                      multiline
                      rows={3}
                      label="Activity log"
                      error={Boolean(touched.activity_log_details && errors.activity_log_details)}
                    />
                    {touched.activity_log_details && errors.activity_log_details && (
                      <FormHelperText error id="standard-weight-helper-text-activity_log_details">
                        {errors.activity_log_details}
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

            <Box sx={{ mt: 1, textAlign: 'center' }}>
              <Button disableElevation disabled={loading} size="large" type="submit" variant="contained" color="secondary">
                Save
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <AlertComponent />
    </>
  );
};

export default LeadActivity;
