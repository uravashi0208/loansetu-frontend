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

const AssignLead = ({ open, handleClose, selectedLead }) => {
  console.log('selectedLead :', selectedLead);
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);

  useEffect(() => {
    getAllStaff();
  }, []);

  const getAllStaff = async () => {
    const response = await GetRequest('/staff/getstaff');
    if (response.data) {
      setStaff(response.data);
    }
  };

  const initialValues = {
    assigne_staff: selectedLead ? selectedLead.assigne_staff : ''
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'leadassigndialogNoRadius' }}>
        <DialogTitle sx={{ backgroundColor: '#070d59' }}>
          <Typography variant="h4" color="#ffffff">
            Lead Assign To
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
              assigne_staff: Yup.string().required('Please select any staff.')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setLoading(true);
                const valuesWithDetails = {
                  ...values,
                  createdby: userData.data._id,
                  leadassign: 'leadassign',
                  old_assigne_staff: selectedLead.assigne_staff
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
                        <InputLabel outlined>Assign Staff</InputLabel>
                        <Select
                          id="outlined-adornment-assigne_staff-login"
                          value={values.assigne_staff}
                          label="assigne_staff"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="assigne_staff"
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          {staff.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.first_name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.assigne_staff && errors.assigne_staff && (
                          <FormHelperText error id="standard-weight-helper-text-assigne_staff-login">
                            {errors.assigne_staff}
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

export default AssignLead;
