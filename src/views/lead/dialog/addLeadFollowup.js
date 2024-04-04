import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, FormHelperText, Grid, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';

// Importing icons from @tabler/icons-react
import { Box } from '@mui/system';
import { Formik } from 'formik';
import PostRequest from 'commonRequest/postRequest';
import { useAlert } from 'ui-component/alert/alert';

const AddLeadFollowUp = ({ open, handleClose, selectedLead }) => {
  const [loading, setLoading] = useState(false);
  const { showAlert, AlertComponent } = useAlert();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  const initialValues = {
    next_followup_date: '',
    comment: ''
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'folloupdialogNoRadius' }}>
        <DialogTitle sx={{ backgroundColor: '#070d59' }}>
          <Typography variant="h4" color="#ffffff">
            Add Followup
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
              next_followup_date: Yup.string().required('Next Folloup Date is required'),
              comment: Yup.string().required('Comment is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setLoading(true);
                let response = await PostRequest('/leadfollowup/addleadfollowup', {
                  next_followup_date: values.next_followup_date,
                  comment: values.comment,
                  student_id: selectedLead._id,
                  createdby: userData.data._id
                });
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
                      <FormControl
                        sx={{ marginBottom: '12px' }}
                        fullWidth
                        error={Boolean(touched.next_followup_date && errors.next_followup_date)}
                      >
                        <TextField
                          id="outlined-adornment-next_followup_date"
                          type="date"
                          value={values.next_followup_date}
                          name="next_followup_date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.next_followup_date && errors.next_followup_date)}
                          variant="outlined" // Add this line
                        />
                        {touched.next_followup_date && errors.next_followup_date && (
                          <FormHelperText error id="standard-weight-helper-text-next_followup_date">
                            {errors.next_followup_date}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth error={Boolean(touched.comment && errors.comment)}>
                        <TextField
                          id="outlined-adornment-comment-login"
                          multiline
                          value={values.comment}
                          name="comment"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="comment"
                          rows={4}
                          variant="outlined" // Add this line
                        />
                        {touched.comment && errors.comment && (
                          <FormHelperText error id="standard-weight-helper-text-comment">
                            {errors.comment}
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

export default AddLeadFollowUp;
