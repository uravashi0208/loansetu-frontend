import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Popover
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';

// Importing icons from @tabler/icons-react
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useAlert } from 'ui-component/alert/alert';
import GetRequest from 'commonRequest/getRequest';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';
import { gridSpacing } from 'store/constant';
import GetRequestOnRole from 'commonRequest/getRequestRole';

const LeadUpdate = ({ open, handleClose, selectedLead }) => {
  const [loading, setLoading] = useState(false);
  const [universityData, setUniversityData] = useState([]);
  const [courseTypeData, setCourseTypeData] = useState([]);
  const [loanTypeData, setLoanTypeData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [newReference, setNewReference] = useState('');
  const [existingReferenceOptions, setExistingReferenceOptions] = useState([]);
  const [staff, setStaff] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);

  useEffect(() => {
    getAllTypeOfLoan();
    getAllCourse();
    getAllStaff();
    getAllCountry();
    getExistingReferenceOptions();
  }, []);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };
  const getUniversitiesByCountry = async (country) => {
    const response = await GetRequestOnRole('/university/getuniversitybycountry/', country);
    if (response.data) {
      setUniversityData(response.data);
    }
  };

  const getAllCountry = async () => {
    const response = await GetRequest('/university/getcountry');
    if (response.data) {
      setCountryData(response.data);
    }
    getUniversitiesByCountry(selectedLead.country);
  };

  const getAllTypeOfLoan = async () => {
    const response = await GetRequest('/loantype/getloantype');
    if (response.data) {
      setLoanTypeData(response.data);
    }
  };

  const getAllCourse = async () => {
    const response = await GetRequest('/coursetype/getcoursetype');
    if (response.data) {
      setCourseTypeData(response.data);
    }
  };
  const getAllStaff = async () => {
    const response = await GetRequest('/staff/getstaff');
    if (response.data) {
      setStaff(response.data);
    }
  };
  const getExistingReferenceOptions = async () => {
    // Fetch existing reference options from backend
    const response = await GetRequest('/reference/getreference');
    if (response.data) {
      setExistingReferenceOptions(response.data);
    }
  };

  const initialValues = {
    assigne_staff: selectedLead.assigne_staff ? selectedLead.assigne_staff : '',
    student_name: selectedLead.student_name ? selectedLead.student_name : '',
    phone: selectedLead.phone ? selectedLead.phone : '',
    email: selectedLead.email ? selectedLead.email : '',
    loantype: selectedLead.loantype ? selectedLead.loantype : '',
    city: selectedLead.city ? selectedLead.city : '',
    country: selectedLead.country ? selectedLead.country : '',
    university: selectedLead.university ? selectedLead.university : '',
    course_type: selectedLead.course_type ? selectedLead.course_type : '',
    remark: selectedLead.remark ? selectedLead.remark : '',
    createdBy: userData.data._id,
    reference: selectedLead.reference ? selectedLead.reference : '',
    editlead: 'editlead',
    submit: null
  };

  const handleAddReference = async () => {
    if (newReference.trim() !== '') {
      // Add new reference to the database
      const response = await PostRequest('/reference/addreference', { reference_name: newReference });
      if (response && response.response === true) {
        // Update existing reference options state
        setExistingReferenceOptions([...existingReferenceOptions, newReference]);
        setNewReference('');
        handlePopoverClose();
      } else {
        showAlert(response.message, 'error');
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'leadupdatedialogNoRadius' }}>
        <DialogTitle sx={{ backgroundColor: '#070d59' }}>
          <Typography variant="h4" color="#ffffff">
            Edit Lead
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
              student_name: Yup.string().required('Name is required'),
              phone: Yup.string().max(10).min(10).required('Phone number is required'),
              loantype: Yup.string().required('Loan type is required')
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                let response = await UpdateFormRequest('/student/editstudent/', values, selectedLead._id);
                if (response && response.response === true) {
                  showAlert(response.message, 'success');
                  setLoading(false);
                  handleClose();
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
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                    Student Information
                  </Typography>
                  <Grid item xs={12} mb={2}>
                    <Grid container spacing={gridSpacing}>
                      {userData.data.role === 'Admin' && (
                        <Grid item xs={12} md={6}>
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
                                  {option.user_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={Boolean(touched.student_name && errors.student_name)}>
                          <TextField
                            id="outlined-adornment-email-login"
                            type="text"
                            value={values.student_name}
                            name="student_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Student Name"
                            error={Boolean(touched.student_name && errors.student_name)}
                            variant="outlined" // Add this line
                          />
                          {touched.student_name && errors.student_name && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {errors.student_name}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
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
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-email-login"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                    Study Information
                  </Typography>
                  <Grid item xs={12} mb={2}>
                    <Grid container spacing={gridSpacing}>
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
                          <InputLabel outlined>Country</InputLabel>
                          <Select
                            id="outlined-adornment-country-login"
                            value={values.country}
                            label="Country"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              getUniversitiesByCountry(e.target.value);
                            }}
                            name="country"
                          >
                            <MenuItem value="" disabled>
                              <em>None</em>
                            </MenuItem>
                            {countryData.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel outlined>University</InputLabel>
                          <Select
                            id="outlined-adornment-university-login"
                            value={values.university}
                            label="University"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="university"
                          >
                            <MenuItem value="" disabled>
                              <em>None</em>
                            </MenuItem>
                            {universityData.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.university_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} mb={2}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel outlined>Course Type</InputLabel>
                          <Select
                            id="outlined-adornment-course_type-login"
                            value={values.course_type}
                            label="course_type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="course_type"
                          >
                            <MenuItem value="" disabled>
                              <em>None</em>
                            </MenuItem>
                            {courseTypeData.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.course_type_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={Boolean(touched.reference && errors.reference)}>
                          <InputLabel outlined>Reference</InputLabel>
                          {userData.data.role === 'Admin' ? (
                            <Select
                              id="outlined-adornment-reference-login"
                              value={values.reference}
                              label="Reference"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="reference"
                              endAdornment={
                                userData.data.role === 'Admin' && (
                                  <IconButton size="large" onClick={handlePopoverOpen}>
                                    <AddIcon />
                                  </IconButton>
                                )
                              }
                            >
                              <MenuItem value="" disabled>
                                {userData.data.role === 'Admin' ? `Select or Add Reference` : `Select Reference`}
                              </MenuItem>
                              {existingReferenceOptions.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                  {option.reference_name}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <TextField
                              id="outlined-adornment-reference-login"
                              type="text"
                              value={values.reference}
                              name="reference"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Reference"
                              variant="outlined" // Add this line
                              disabled
                            />
                          )}
                          {touched.reference && errors.reference && (
                            <FormHelperText error id="standard-weight-helper-text-reference">
                              {errors.reference}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <Popover
                          open={Boolean(popoverAnchor)}
                          anchorEl={popoverAnchor}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                          }}
                        >
                          <Box p={2}>
                            <Typography variant="h6" gutterBottom>
                              Add New Reference
                            </Typography>
                            <TextField
                              id="outlined-adornment-new-reference"
                              type="text"
                              value={newReference}
                              onChange={(e) => setNewReference(e.target.value)}
                              label="New Reference"
                              variant="outlined"
                              fullWidth
                            />
                            <Box mt={2}>
                              <Button variant="contained" onClick={handleAddReference}>
                                Add
                              </Button>
                            </Box>
                          </Box>
                        </Popover>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} mb={2}>
                    <Grid container spacing={gridSpacing}>
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
                    </Grid>
                  </Grid>
                </Box>

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

export default LeadUpdate;
