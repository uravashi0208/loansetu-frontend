import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  Typography,
  Input
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Importing icons from @tabler/icons-react
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useAlert } from 'ui-component/alert/alert';
import GetRequest from 'commonRequest/getRequest';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';
import { gridSpacing } from 'store/constant';
import { IconUpload } from '@tabler/icons-react';

const LeadConvertToCustomer = ({ open, handleClose, selectedLead }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUploadDocument, setSelectedUploadDocument] = useState(null);
  const [loanTypeData, setLoanTypeData] = useState([]);
  const [staff, setStaff] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);

  useEffect(() => {
    getAllTypeOfLoan();
    getAllServiceStaff();
  }, []);

  const getAllTypeOfLoan = async () => {
    const response = await GetRequest('/loantype/getloantype');
    if (response.data) {
      setLoanTypeData(response.data);
    }
  };

  const getAllServiceStaff = async () => {
    const response = await GetRequest('/staff/getstaff');
    if (response.data) {
      const staffRecords = response.data.filter((record) => record.staff_team === 'service');
      setStaff(staffRecords);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    email: selectedLead.email ? selectedLead.email : '',
    city: selectedLead.city ? selectedLead.city : '',
    state: selectedLead.state ? selectedLead.state : '',
    loantype: selectedLead.loantype ? selectedLead.loantype : '',
    resident_address: selectedLead.resident_address ? selectedLead.resident_address : '',
    remark: selectedLead.remark ? selectedLead.remark : '',
    service_staff: selectedLead.service_staff ? selectedLead.service_staff : '',
    loan_amount: selectedLead.loan_amount ? selectedLead.loan_amount : '',
    password: selectedLead.password ? selectedLead.password : '',
    createdBy: userData.data._id,
    convert_to_customer: 'converttocustomer',
    upload_document: ''
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'leadupdatedialogNoRadius' }}>
        <DialogTitle sx={{ backgroundColor: '#070d59' }}>
          <Typography variant="h4" color="#ffffff">
            Convert To Customer
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
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
              loantype: Yup.string().required('Loan type is required'),
              service_staff: Yup.string().required('Service Staff is required')
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                  if (key === 'upload_document' && values[key]) {
                    const file = values[key] instanceof File ? values[key] : new File([values[key]], values[key].name);
                    formData.append(key, file);
                  } else if (values[key] !== undefined) {
                    // Add this check
                    formData.append(key, values[key]);
                  }
                });
                let response = await UpdateFormRequest('/student/editstudent/', formData, selectedLead._id);
                if (response && response.response === true) {
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
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                        <TextField
                          id="outlined-adornment-email-login"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Email"
                          variant="outlined" // Add this line
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="standard-weight-helper-text-email">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-city-login"
                          type="text"
                          value={values.city}
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="City"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-state-login"
                          type="text"
                          value={values.state}
                          name="state"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="State"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.loantype && errors.loantype)}>
                        <InputLabel outlined>Type Of Loan</InputLabel>
                        <Select
                          id="outlined-adornment-loantype-login"
                          value={values.loantype}
                          label="Type Of Loan"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="loantype"
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          {loanTypeData.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.loan_type}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.loantype && errors.loantype && (
                          <FormHelperText error id="standard-weight-helper-text-loantype">
                            {errors.loantype}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-resident_address-login"
                          multiline
                          value={values.resident_address}
                          name="resident_address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Resident Address"
                          rows={4}
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-remark-login"
                          multiline
                          value={values.remark}
                          name="remark"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Remark"
                          rows={4}
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.service_staff && errors.service_staff)}>
                        <InputLabel outlined>Service Staff</InputLabel>
                        <Select
                          id="outlined-adornment-service_staff-login"
                          value={values.service_staff}
                          label="Service Staff"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="service_staff"
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          {staff.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.user_name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.service_staff && errors.service_staff && (
                          <FormHelperText error id="standard-weight-helper-text-service_staff">
                            {errors.service_staff}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-loan_amount-login"
                          type="text"
                          value={values.loan_amount}
                          name="loan_amount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Loan Amount"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                        <TextField
                          id="outlined-adornment-password-login"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Password"
                          error={Boolean(touched.password && errors.password)}
                          variant="outlined" // Add this line
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {touched.password && errors.password && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.password}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label htmlFor="upload-document">
                        <Button color="secondary" variant="outlined" component="span">
                          <IconUpload stroke={2} />
                          Upload Documents
                        </Button>
                      </label>
                      <Input
                        id="upload-document"
                        type="file"
                        accept="pdf/*"
                        onChange={(event) => {
                          setSelectedUploadDocument(event.currentTarget.files[0].name);
                          setFieldValue('upload_document', event.currentTarget.files[0]);
                        }}
                        style={{ display: 'none' }}
                      />
                      {selectedUploadDocument && <label style={{ marginLeft: '20px' }}>{selectedUploadDocument}</label>}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                  </Button>
                  <Button disableElevation size="large" type="reset" variant="outlined" color="secondary">
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

export default LeadConvertToCustomer;
