// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Divider,
  CircularProgress
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import GetRequest from 'commonRequest/getRequest';
import { useLocation, useNavigate } from 'react-router';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import { useAlert } from 'ui-component/alert/alert';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';
import StaffPermission from './StaffPermission';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const EditStaffProfile = () => {
  const navigate = useNavigate();
  const [branchLocation, setBranchLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const location = useLocation();

  useEffect(() => {
    getAllBranchLocation();
    if (location && location.state !== null) {
      getStaffById(location.state);
    }
  }, []);

  const getStaffById = async (id) => {
    const response = await GetByIdRequest('/staff/getstaffbyid/', id);
    if (response.data) {
      setStaffData(response.data);
    }
  };

  const getAllBranchLocation = async () => {
    const response = await GetRequest('/branchlocation/getbranchlocation');
    if (response.data) {
      setBranchLocation(response.data);
    }
  };

  const initialValues = {
    first_name: staffData.first_name ? staffData.first_name : '',
    last_name: staffData.last_name ? staffData.last_name : '',
    email: staffData.email ? staffData.email : '',
    rate: staffData.rate ? staffData.rate : '',
    phone: staffData.phone ? staffData.phone : '',
    company_email: staffData.company_email ? staffData.company_email : '',
    emailsignature: staffData.emailsignature ? staffData.emailsignature : '',
    isAdmin: staffData.isAdmin ? staffData.isAdmin : false,
    isStaff: staffData.isStaff ? staffData.isStaff : false,
    isSendWelcomeMail: staffData.isSendWelcomeMail ? staffData.isSendWelcomeMail : true,
    staff_team: staffData.staff_team ? staffData.staff_team : '',
    father_name: staffData.father_name ? staffData.father_name : '',
    father_phone: staffData.father_phone ? staffData.father_phone : '',
    address: staffData.address ? staffData.address : '',
    pan_number: staffData.pan_number ? staffData.pan_number : '',
    aadhar_number: staffData.aadhar_number ? staffData.aadhar_number : '',
    uan_number: staffData.uan_number ? staffData.uan_number : '',
    branchlocation: staffData.branchlocation ? staffData.branchlocation : ''
  };
  return (
    <>
      <MainCard title="Edit Staff">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            phone: Yup.string().max(10).min(10).required('Phone number is required'),
            staff_team: Yup.string().max(255).required('Team is required'),
            pan_number: Yup.string().max(255).required('PAN number is required'),
            aadhar_number: Yup.string().max(255).required('Aadhar number is required')
          })}
          onSubmit={async (values) => {
            console.log('Loading :', loading);
            try {
              setLoading(true);
              let response = await UpdateFormRequest('/staff/editstaff/', values, staffData._id);
              if (response && response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/staff');
                }, 1000);
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
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                  Personal Information
                </Typography>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)}>
                        <TextField
                          id="outlined-adornment-email-login"
                          type="text"
                          value={values.first_name}
                          name="first_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="First Name"
                          error={Boolean(touched.first_name && errors.first_name)}
                          variant="outlined" // Add this line
                        />
                        {touched.first_name && errors.first_name && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.first_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.last_name && errors.last_name)}>
                        <TextField
                          id="outlined-adornment-last_name-login"
                          type="text"
                          value={values.last_name}
                          name="last_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Last Name"
                          error={Boolean(touched.last_name && errors.last_name)}
                          variant="outlined" // Add this line
                        />
                        {touched.last_name && errors.last_name && (
                          <FormHelperText error id="standard-weight-helper-text-last_name-login">
                            {errors.last_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

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
                          error={Boolean(touched.email && errors.email)}
                          variant="outlined" // Add this line
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                        <TextField
                          id="outlined-adornment-email-login"
                          type="number"
                          value={values.phone}
                          name="phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Phone Number"
                          error={Boolean(touched.phone && errors.phone)}
                          variant="outlined" // Add this line
                        />
                        {touched.phone && errors.phone && (
                          <FormHelperText error id="standard-weight-helper-text-phone-login">
                            {errors.phone}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.company_email && errors.company_email)}>
                        <TextField
                          id="outlined-adornment-company_email-login"
                          type="email"
                          value={values.company_email}
                          name="company_email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Company Email"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Parents Information
                </Typography>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-father_name-login"
                          value={values.father_name}
                          name="father_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Father's Full Name"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-father_phone-login"
                          type="number"
                          value={values.father_phone}
                          name="father_phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Father's Mobile Number"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={7}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-address-login"
                          multiline
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Residence Address"
                          rows={4}
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {/* Documnets */}

              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Documents
                </Typography>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.pan_number && errors.pan_number)}>
                        <TextField
                          id="outlined-adornment-pan_number-login"
                          value={values.pan_number}
                          name="pan_number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="PAN Number"
                          variant="outlined" // Add this line
                          error={Boolean(touched.pan_number && errors.pan_number)}
                        />
                        {touched.pan_number && errors.pan_number && (
                          <FormHelperText error id="standard-weight-helper-text-pan_number-login">
                            {errors.pan_number}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.aadhar_number && errors.aadhar_number)}>
                        <TextField
                          id="outlined-adornment-aadhar_number-login"
                          value={values.aadhar_number}
                          name="aadhar_number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Aadhar Number"
                          variant="outlined" // Add this line
                          error={Boolean(touched.aadhar_number && errors.aadhar_number)}
                        />
                        {touched.aadhar_number && errors.aadhar_number && (
                          <FormHelperText error id="standard-weight-helper-text-aadhar_number-login">
                            {errors.aadhar_number}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-uan_number-login"
                          value={values.uan_number}
                          name="uan_number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="UAN Number"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              {/* Other Information */}
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Other Details
                </Typography>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-email-login"
                          type="number"
                          value={values.rate}
                          name="rate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Salary"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.staff_team && errors.staff_team)}>
                        <InputLabel outlined>Staff Team</InputLabel>
                        <Select
                          id="outlined-adornment-staff_team-login"
                          value={values.staff_team}
                          label="Staff Team"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="staff_team"
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'sales'}>Sales</MenuItem>
                          <MenuItem value={'service'}>Service</MenuItem>
                        </Select>
                        {touched.staff_team && errors.staff_team && (
                          <FormHelperText error id="standard-weight-helper-text-staff_team-login">
                            {errors.staff_team}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-email-login"
                          multiline
                          rows={3}
                          value={values.emailsignature}
                          name="emailsignature"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Email Signature"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel outlined>Branch Location</InputLabel>
                        <Select
                          id="outlined-adornment-branchlocation-login"
                          value={values.branchlocation}
                          label="Branch Location"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="branchlocation"
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          {branchLocation.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.location_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={7}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.isStaff || false}
                            onChange={handleChange}
                            name="isStaff"
                            color="primary"
                            disabled={values.isAdmin}
                          />
                        }
                        label="Is Staff"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.isAdmin || false}
                            onChange={handleChange}
                            name="isAdmin"
                            color="primary"
                            disabled={values.isStaff}
                          />
                        }
                        label="Is Administrator"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.isSendWelcomeMail || false}
                            onChange={handleChange}
                            name="isSendWelcomeMail"
                            color="primary"
                          />
                        }
                        label="Send welcome email"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button disableElevation disabled={loading} size="large" type="submit" variant="contained" color="secondary" sx={{ mr: 2 }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
                <Button disableElevation size="large" type="reset" variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </MainCard>
      <MainCard sx={{ marginTop: '15px' }}>
        <StaffPermission />
      </MainCard>
      <AlertComponent />
    </>
  );
};

export default EditStaffProfile;
