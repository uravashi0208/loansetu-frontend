import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Divider,
  CircularProgress,
  Popover,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import GetRequest from 'commonRequest/getRequest';
import { useLocation, useNavigate } from 'react-router';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import { useAlert } from 'ui-component/alert/alert';
import PostRequest from 'commonRequest/postRequest';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';
import GetRequestOnRole from 'commonRequest/getRequestRole';

const AddEditLead = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [courseTypeData, setCourseTypeData] = useState([]);
  const [loanTypeData, setLoanTypeData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [existingReferenceOptions, setExistingReferenceOptions] = useState([]); // Define state for existing reference options
  const [staff, setStaff] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [newReference, setNewReference] = useState('');
  const { showAlert, AlertComponent } = useAlert();
  const location = useLocation();
  const tokenValue = localStorage.getItem('token');
  const roleData = JSON.parse(tokenValue);

  useEffect(() => {
    if (location && location.state !== null) {
      getStudentById(location.state);
    }
    getAllTypeOfLoan();
    getAllCourse();
    getAllStaff();
    getAllCountry();
    getExistingReferenceOptions();
    getStaffPermissionById();
  }, []);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };
  const getStudentById = async (id) => {
    const response = await GetByIdRequest('/student/getstudentbyid/', id);
    setStudentData(response.data);
  };

  const getExistingReferenceOptions = async () => {
    // Fetch existing reference options from backend
    const response = await GetRequest('/reference/getreference');
    if (response.data) {
      setExistingReferenceOptions(response.data);
    }
  };

  const getUniversitiesByCountry = async (country) => {
    if (country !== undefined) {
      const response = await GetRequestOnRole('/university/getuniversitybycountry/', country);
      if (response.data) {
        setUniversityData(response.data);
      }
    }
  };

  const getAllCountry = async () => {
    const response = await GetRequest('/university/getcountry');
    if (response.data) {
      setCountryData(response.data);
    }
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
      const staffRecords = response.data.filter((record) => record.role != 'partner');
      setStaff(staffRecords);
    }
  };

  const getStaffPermissionById = async () => {
    const response = await GetByIdRequest('/staff/getstaffpermissionbyid/', roleData?.data?._id);
    if (response.response === true) {
      const permissionsData = response.data.permissions;
      setPermissions(permissionsData);
    }
  };

  const initialValues = {
    assigne_staff:
      roleData.data.role === 'staff' ? roleData.data._id : studentData.assigne_staff ? studentData.assigne_staff : roleData.data._id,
    student_name: studentData.student_name ? studentData.student_name : '',
    phone: studentData.phone ? studentData.phone : '',
    email: studentData.email ? studentData.email : '',
    loantype: studentData.loantype ? studentData.loantype : '',
    city: studentData.city ? studentData.city : '',
    country: studentData.country ? studentData.country : '',
    university: studentData.university ? studentData.university : '',
    course_type: studentData.course_type ? studentData.course_type : '',
    remark: studentData.remark ? studentData.remark : '',
    isLead: true,
    createdBy: roleData.data._id,
    reference: roleData.data.role === 'partner' ? roleData.data._id : studentData.reference ? studentData.reference : '',
    area_post_code: studentData.area_post_code ? studentData.area_post_code : '',
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
      <MainCard title={`${studentData.length === 0 ? 'Add' : 'Edit'} Lead`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            student_name: Yup.string().required('Name is required'),
            phone: Yup.string().max(10).min(10).required('Phone number is required'),
            loantype: Yup.string().required('Loan type is required'),
            reference: Yup.string().required('Reference is required'),
            area_post_code: Yup.string().required('Postcode is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              let response;
              if (roleData.data.role === 'partner') {
                response = await PostRequest('/student/addpartnerlead', values);
              }
              else {
                studentData._id
                  ? (response = await UpdateFormRequest('/student/editstudent/', values, studentData._id))
                  : (response = await PostRequest('/student/addstudent', values));
              }
              if (response && response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/lead');
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
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                  Student Information
                </Typography>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    {roleData.data.role === 'Admin' && (
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
                      <FormControl fullWidth error={Boolean(touched.area_post_code && errors.area_post_code)}>
                        <TextField
                          id="outlined-adornment-area_post_code"
                          value={values.area_post_code}
                          name="area_post_code"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Area Post Code"
                          type="text"
                          variant="outlined" // Add this line
                          error={Boolean(touched.area_post_code && errors.area_post_code)}
                        />
                        {touched.area_post_code && errors.area_post_code && (
                          <FormHelperText error id="standard-weight-helper-text-area_post_code">
                            {errors.area_post_code}
                          </FormHelperText>
                        )}
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
                    {roleData.data.role !== 'partner' && (
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={Boolean(touched.reference && errors.reference)}>
                          <InputLabel outlined>Reference</InputLabel>
                          <Select
                            id="outlined-adornment-reference-login"
                            value={values.reference}
                            label="Reference"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="reference"
                            endAdornment={
                              (roleData.data.role === 'Admin' || permissions[3]?.view === true || roleData.data.role === 'staff') && (
                                <IconButton size="large" onClick={handlePopoverOpen}>
                                  <AddIcon />
                                </IconButton>
                              )
                            }
                          >
                            <MenuItem value="" disabled>
                              {roleData.data.role === 'Admin' || permissions[3]?.view === true || roleData.data.role === 'staff'
                                ? `Select or Add Reference`
                                : `Select Reference`}
                            </MenuItem>
                            {existingReferenceOptions.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.company_name}
                              </MenuItem>
                            ))}
                          </Select>
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
                    )}
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
      <AlertComponent />
    </>
  );
};

export default AddEditLead;
