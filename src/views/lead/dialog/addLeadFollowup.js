import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormLabel
} from '@mui/material';
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
    current_followup_date: '',
    current_followup_comment: '',
    next_followup_date: '',
    next_followup_comment: '',
    followup_place: '' // Default to 'call'
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'followupdialogNoRadius' }}>
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
              next_followup_comment: Yup.string().required('Comment is required'),
              followup_place: Yup.string().required('Follow-up Place is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setLoading(true);
                let response = await PostRequest('/leadfollowup/addleadfollowup', {
                  student_id: selectedLead._id,
                  createdby: userData.data._id,
                  current_followup_date: values.current_followup_date,
                  current_followup_comment: values.current_followup_comment,
                  next_followup_date: values.next_followup_date,
                  next_followup_comment: values.next_followup_comment,
                  followup_place: values.followup_place
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
                      <FormControl sx={{ marginBottom: '12px' }} fullWidth>
                        <TextField
                          id="outlined-adornment-current_followup_date"
                          type="datetime-local"
                          value={values.current_followup_date}
                          name="current_followup_date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant="outlined" // Add this line
                          // label={<InputLabel shrink>Next Follow Up Date (dd-mm-yyyy)</InputLabel>}
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl sx={{ marginBottom: '12px' }} fullWidth>
                        <TextField
                          id="outlined-adornment-current_followup_comment-login"
                          multiline
                          value={values.current_followup_comment}
                          name="current_followup_comment"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Current Follow Up Comment"
                          rows={4}
                          variant="outlined" // Add this line
                          maxDate={new Date()}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        sx={{ marginBottom: '12px' }}
                        fullWidth
                        error={Boolean(touched.next_followup_date && errors.next_followup_date)}
                      >
                        <TextField
                          id="outlined-adornment-next_followup_date"
                          type="datetime-local"
                          value={values.next_followup_date}
                          name="next_followup_date"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.next_followup_date && errors.next_followup_date)}
                          variant="outlined" // Add this line
                          // label="Next Follow Up Date"
                        />
                        {touched.next_followup_date && errors.next_followup_date && (
                          <FormHelperText error id="standard-weight-helper-text-next_followup_date">
                            {errors.next_followup_date}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        sx={{ marginBottom: '12px' }}
                        error={Boolean(touched.next_followup_comment && errors.next_followup_comment)}
                      >
                        <TextField
                          id="outlined-adornment-next_followup_comment-login"
                          multiline
                          value={values.next_followup_comment}
                          name="next_followup_comment"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Next Follow Up Comment"
                          rows={4}
                          variant="outlined" // Add this line
                          maxDate={new Date()}
                        />
                        {touched.next_followup_comment && errors.next_followup_comment && (
                          <FormHelperText error id="standard-weight-helper-text-next_followup_comment">
                            {errors.next_followup_comment}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl component="fieldset" error={Boolean(touched.followup_place && errors.followup_place)}>
                        <FormLabel component="legend">Follow-up Place</FormLabel>
                        <RadioGroup aria-label="followup_place" name="followup_place" value={values.followup_place} onChange={handleChange}>
                          <FormControlLabel value="call" control={<Radio />} label="Call" />
                          <FormControlLabel value="at_office" control={<Radio />} label="At Office" />
                          <FormControlLabel value="at_home" control={<Radio />} label="At Home" />
                          <FormControlLabel value="whatsapp" control={<Radio />} label="WhatsApp" />
                        </RadioGroup>
                        {touched.followup_place && errors.followup_place && <FormHelperText error>{errors.followup_place}</FormHelperText>}
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
