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
  CircularProgress,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import GetRequest from 'commonRequest/getRequest';
import { useLocation } from 'react-router';
import GetByIdRequest from 'commonRequest/getByIdRequest';
// import { useAlert } from 'ui-component/alert/alert';
// import PostRequest from 'commonRequest/postRequest';
// import UpdateFormRequest from 'commonRequest/updatefoemRequest';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddEditLead = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [courseTypeData, setCourseTypeData] = useState([]);
  const [leadStatusData, setLeadStatusData] = useState([]);
  const [staff, setStaff] = useState([]);
  // const { showAlert, AlertComponent } = useAlert();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state !== null) {
      getStaffById(location.state);
    }
    getAllUniversity();
    getAllCourse();
    getAllLeadStatus();
    getAllStaff();
  }, []);

  const getStaffById = async (id) => {
    const response = await GetByIdRequest('/staff/getstaffbyid/', id);
    setStaffData(response.data);
  };

  const getAllUniversity = async () => {
    const response = await GetRequest('/university/getuniversity');
    if (response.data) {
      setUniversityData(response.data);
    }
  };

  const getAllCourse = async () => {
    const response = await GetRequest('/coursetype/getcoursetype');
    if (response.data) {
      setCourseTypeData(response.data);
    }
  };

  const getAllLeadStatus = async () => {
    const response = await GetRequest('/leadstatus/getleadstatus');
    if (response.data) {
      setLeadStatusData(response.data);
    }
  };

  const getAllStaff = async () => {
    const response = await GetRequest('/staff/getstaff');
    if (response.data) {
      setStaff(response.data);
    }
  };

  const [examinationDetails, setExaminationDetails] = useState([{ examination: '', passingYear: '', percentage: '', backlog: '' }]);

  const handleAddDetail = () => {
    setExaminationDetails([...examinationDetails, { examination: '', passingYear: '', percentage: '', backlog: '' }]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...examinationDetails];
    updatedDetails.splice(index, 1);
    setExaminationDetails(updatedDetails);
  };

  const initialValues = {
    student_name: staffData.student_name ? staffData.student_name : '',
    phone: staffData.phone ? staffData.phone : '',
    email: staffData.email ? staffData.email : '',
    country: staffData.country ? staffData.country : '',
    university: staffData.university ? staffData.university : '',
    course_name: staffData.course_name ? staffData.company_email : '',
    course_type: staffData.course_type ? staffData.course_type : '',
    last_study: staffData.last_study ? staffData.last_study : '',
    exam: staffData.exam ? staffData.exam : '',
    exam_core: staffData.exam_core ? staffData.exam_core : '',
    job: staffData.job ? staffData.job : false,
    business: staffData.business ? staffData.business : false,
    retired: staffData.retired ? staffData.retired : false,

    address: staffData.address ? staffData.address : '',
    pan_number: staffData.pan_number ? staffData.pan_number : '',
    aadhar_number: staffData.aadhar_number ? staffData.aadhar_number : '',
    uan_number: staffData.uan_number ? staffData.uan_number : '',
    branchlocation: staffData.branchlocation ? staffData.branchlocation : '',
    submit: null
  };
  return (
    <>
      <MainCard title={`${staffData.length === 0 ? 'Add' : 'Edit'} Lead`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            student_name: Yup.string().required('Name is required'),
            phone: Yup.string().max(10).min(10).required('Phone number is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              console.log('values', values);
              // const formData = new FormData();
              // Object.keys(values).forEach((key) => {
              //   if ((key === 'image' || key === 'pan_image' || key === 'aadhar_image' || key === 'contract_pdf') && values[key]) {
              //     const file = values[key] instanceof File ? values[key] : new File([values[key]], values[key].name);
              //     formData.append(key, file);
              //   } else if (values[key] !== undefined) {
              //     // Add this check
              //     formData.append(key, values[key]);
              //   }
              // });
              // let response;
              // staffData._id
              //   ? (response = await UpdateFormRequest('/staff/editstaff/', values, staffData._id))
              //   : (response = await PostRequest('/staff/addstaff', formData));
              // if (response && response.response === true) {
              //   showAlert(response.message, 'success');
              //   setTimeout(() => {
              //     setLoading(false);
              //     navigate('/staff');
              //   }, 1000);
              // } else {
              //   setLoading(false);
              //   showAlert(response.message, 'error');
              // }
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
                    <FormControl fullWidth>
                      <InputLabel outlined>Lead Status</InputLabel>
                      <Select
                        id="outlined-adornment-lead_status-login"
                        value={values.lead_status}
                        label="lead_status"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="lead_status"
                      >
                        <MenuItem value="" disabled>
                          <em>None</em>
                        </MenuItem>
                        {leadStatusData.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.lead_status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
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
                            {option.first_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                  Student Information
                </Typography>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
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
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                  Study Information
                </Typography>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.country && errors.country)}>
                        <InputLabel outlined>Country</InputLabel>
                        <Select
                          id="outlined-adornment-country-login"
                          value={values.country}
                          label="Country"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="country"
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'sales'}>Sales</MenuItem>
                          <MenuItem value={'serice'}>Service</MenuItem>
                        </Select>
                        {touched.country && errors.country && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.country}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.university && errors.university)}>
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
                        {touched.university && errors.university && (
                          <FormHelperText error id="standard-weight-helper-text-university-login">
                            {errors.university}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.course_name && errors.course_name)}>
                        <TextField
                          id="outlined-adornment-course_name-login"
                          type="text"
                          value={values.course_name}
                          name="course_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Course Name"
                          error={Boolean(touched.course_name && errors.course_name)}
                          variant="outlined" // Add this line
                        />
                        {touched.course_name && errors.course_name && (
                          <FormHelperText error id="standard-weight-helper-text-course_name-login">
                            {errors.course_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={Boolean(touched.course_type && errors.course_type)}>
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
                        {touched.course_type && errors.course_type && (
                          <FormHelperText error id="standard-weight-helper-text-course_type-login">
                            {errors.course_type}
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
                          id="outlined-adornment-last_study-login"
                          type="text"
                          value={values.last_study}
                          name="last_study"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Last Study"
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
                  Examination Details
                </Typography>

                {examinationDetails.map((detail, index) => (
                  <Grid container spacing={2} key={index} mb={2}>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          value={detail.examination}
                          name={`examination_${index}`}
                          onChange={handleChange}
                          label="Examination"
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          value={detail.passingYear}
                          name={`passingYear_${index}`}
                          onChange={handleChange}
                          label="Passing Year"
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          value={detail.percentage}
                          name={`percentage_${index}`}
                          onChange={handleChange}
                          label="Percentage"
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth>
                        <TextField
                          value={detail.backlog}
                          name={`backlog_${index}`}
                          onChange={handleChange}
                          label="Backlog"
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={1} sx={{ display: 'flex' }}>
                      {index !== 0 && (
                        <IconButton onClick={() => handleRemoveDetail(index)}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                      {index === examinationDetails.length - 1 && (
                        <IconButton onClick={handleAddDetail}>
                          <AddIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={7}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Select Exam</FormLabel>
                        <RadioGroup row aria-label="exam" name="exam" value={values.exam} onChange={handleChange}>
                          <FormControlLabel value="IELTS" control={<Radio />} label="IELTS" />
                          <FormControlLabel value="PTE" control={<Radio />} label="PTE" />
                          <FormControlLabel value="GRE" control={<Radio />} label="GRE" />
                          <FormControlLabel value="Doolingo" control={<Radio />} label="Doolingo" />
                          <FormControlLabel value="TOEFL" control={<Radio />} label="TOEFL" />
                          {/* Add more FormControlLabels for other exam options */}
                        </RadioGroup>
                        {touched.exam && errors.exam && <FormHelperText error>{errors.exam}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-exam_core-login"
                          type="number"
                          value={values.exam_core}
                          name="exam_core"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Exam Score"
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
                      <FormLabel component="legend">Father Profession</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.job || false}
                            onChange={handleChange}
                            name="job"
                            color="primary"
                            disabled={values.business || values.retired}
                          />
                        }
                        label="Job"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.business || false}
                            onChange={handleChange}
                            name="business"
                            color="primary"
                            disabled={values.job || values.retired}
                          />
                        }
                        label="Business"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.retired || false}
                            onChange={handleChange}
                            name="retired"
                            color="primary"
                            disabled={values.job || values.business}
                          />
                        }
                        label="Retired"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormLabel component="legend">
                        {values.job ? (
                          <Typography variant="h5" gutterBottom>
                            If Job
                          </Typography>
                        ) : values.business ? (
                          <Typography variant="h5" gutterBottom>
                            If Bussiness
                          </Typography>
                        ) : (
                          ''
                        )}
                      </FormLabel>
                      {values.job ? (
                        <>
                          <TextField
                            type="number"
                            id="monthlySalary"
                            name="monthlySalary"
                            label="Monthly Salary"
                            value={values.monthlySalary}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.salaryInCash}
                                onChange={handleChange}
                                name="salaryInCash"
                                color="primary"
                                disabled={values.salaryInBank}
                              />
                            }
                            label="Salary in Cash"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.salaryInBank}
                                onChange={handleChange}
                                name="salaryInBank"
                                color="primary"
                                disabled={values.salaryInCash}
                              />
                            }
                            label="Salary in Bank"
                          />
                          <TextField
                            id="designation"
                            name="designation"
                            label="Designation"
                            value={values.designation}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                          />
                        </>
                      ) : values.business ? (
                        <>
                          <TextField
                            type="text"
                            id="bussinessline"
                            name="bussinessline"
                            label="Line of Bussiness"
                            value={values.bussinessline}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                          />
                          <FormLabel component="legend">Any Bussiness proof form below</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.gst}
                                onChange={handleChange}
                                name="gst"
                                color="primary"
                                disabled={values.ssi || values.gumasradhara_licence || values.professional_tax}
                              />
                            }
                            label="GST"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.ssi}
                                onChange={handleChange}
                                name="ssi"
                                color="primary"
                                disabled={values.gst || values.gumasradhara_licence || values.professional_tax}
                              />
                            }
                            label="SSI"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.professional_tax}
                                onChange={handleChange}
                                name="professional_tax"
                                color="primary"
                                disabled={values.gst || values.gumasradhara_licence || values.ssi}
                              />
                            }
                            label="Professional Tax"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.gumasradhara_licence}
                                onChange={handleChange}
                                name="gumasradhara_licence"
                                color="primary"
                                disabled={values.gst || values.professional_tax || values.ssi}
                              />
                            }
                            label="Gumasradhara Licence"
                          />
                          <FormLabel component="legend">Business has Current A/C?</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox checked={values.yes} onChange={handleChange} name="yes" color="primary" disabled={values.no} />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={values.ssi} onChange={handleChange} name="no" color="primary" disabled={values.yes} />
                            }
                            label="No"
                          />
                        </>
                      ) : (
                        ''
                      )}
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
      {/* <AlertComponent /> */}
    </>
  );
};

export default AddEditLead;
