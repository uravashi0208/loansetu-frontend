import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';

// Importing icons from @tabler/icons-react
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useAlert } from 'ui-component/alert/alert';
import GetRequest from 'commonRequest/getRequest';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';

const ChangeLeadStatus = ({ open, handleClose, selectedLead }) => {
  const [loading, setLoading] = useState(false);
  const [leadStatus, setLeadStatus] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);

  useEffect(() => {
    getAllLeadStatus();
  }, []);

  const getAllLeadStatus = async () => {
    const response = await GetRequest('/leadstatus/getleadstatus');
    if (response.data) {
      setLeadStatus(response.data);
    }
  };

  const initialValues = {
    leadstatus: selectedLead.leadstatus ? selectedLead.leadstatus : ''
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'leadstatuschnagedialogNoRadius' }}>
        <DialogTitle sx={{ backgroundColor: '#070d59' }}>
          <Typography variant="h4" color="#ffffff">
            Change Status
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 13,
            borderRadius: '2px',
            color: '#070d59',
            backgroundColor: '#ffffff',
            transition: 'transform 0.3s ease',
            padding: '0px',
            '&:hover': {
              animation: 'shake 0.5s',
              backgroundColor: '#ffffff'
            },
            '@keyframes shake': {
              '0%': {
                transform: 'translateX(0)'
              },
              '25%': {
                transform: 'translateX(5px)'
              },
              '50%': {
                transform: 'translateX(-5px)'
              },
              '75%': {
                transform: 'translateX(5px)'
              },
              '100%': {
                transform: 'translateX(0)'
              }
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              leadstatus: Yup.string().required('Lead Status is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setLoading(true);
                const valuesWithDetails = {
                  ...values,
                  createdby: userData.data._id,
                  leadassign: 'leadstatuschange'
                };
                let response = await UpdateFormRequest('/student/editstudent/', valuesWithDetails, selectedLead._id);
                if (response.response === true) {
                  showAlert(response.message, 'success');
                  setLoading(false);
                  handleClose();
                } else {
                  setLoading(false);
                  showAlert(response.message, 'error');
                }
              } catch (err) {
                console.log('err :', err);
                setLoading(false);
              } finally {
                setSubmitting(false); // Ensure form submission state is updated
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <InputLabel outlined>Change Status</InputLabel>
                        <Select
                          id="outlined-adornment-leadstatus-login"
                          value={values.leadstatus}
                          label="Change Status"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="leadstatus"
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          {leadStatus.map((option) => (
                            <MenuItem key={option.lead_status} value={option.lead_status} sx={{ textTransform: 'capitalize' }}>
                              {option.lead_status}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.leadstatus && errors.leadstatus && (
                          <FormHelperText error id="standard-weight-helper-text-leadstatus-login">
                            {errors.leadstatus}
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
                  <Button
                    disableElevation
                    disabled={loading}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 2 }}
                  >
                    Save
                    {/* {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'} */}
                  </Button>
                  <Button disableElevation size="large" type="reset" variant="outlined" color="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <AlertComponent />
    </>
  );
};

export default ChangeLeadStatus;
