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
import { useLocation, useNavigate } from 'react-router';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import { useAlert } from 'ui-component/alert/alert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PostRequest from 'commonRequest/postRequest';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';
import GetRequestOnRole from 'commonRequest/getRequestRole';

const AddEditStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [courseTypeData, setCourseTypeData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [examinationDetails, setExaminationDetails] = useState([{ examination: '', passingYear: '', percentage: '', school_name: '' }]);
  const [staff, setStaff] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const location = useLocation();
  const tokenValue = localStorage.getItem('token');
  const roleData = JSON.parse(tokenValue);

  useEffect(() => {
    if (location && location.state !== null) {
      getStudentById(location.state);
    }
    getAllCourse();
    getAllStaff();
    getAllCountry();
  }, []);

  const getStudentById = async (id) => {
    const response = await GetByIdRequest('/student/getstudentbyid/', id);
    if (response.data.country) getUniversitiesByCountry(response.data.country);
    setExaminationDetails(response.data.education);
    setStudentData(response.data);
  };

  const getAllCountry = async () => {
    const response = await GetRequest('/university/getcountry');
    if (response.data) {
      setCountryData(response.data);
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

  const handleAddDetail = () => {
    setExaminationDetails([...examinationDetails, { examination: '', passingYear: '', percentage: '', school_name: '' }]);
  };
  const handleChangeDetail = (i, e) => {
    let newFormValues = [...examinationDetails];
    newFormValues[i][e.target.name] = e.target.value;
    setExaminationDetails(newFormValues);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...examinationDetails];
    updatedDetails.splice(index, 1);
    setExaminationDetails(updatedDetails);
  };

  const initialValues = {
    assigne_staff: studentData.assigne_staff ? studentData.assigne_staff : '',
    student_name: studentData.student_name ? studentData.student_name : '',
    phone: studentData.phone ? studentData.phone : '',
    email: studentData.email ? studentData.email : '',
    country: studentData.country ? studentData.country : '',
    university: studentData.university ? studentData.university : '',
    course_name: studentData.course_name ? studentData.company_email : '',
    course_type: studentData.course_type ? studentData.course_type : '',
    last_study: studentData.last_study ? studentData.last_study : '',
    exam: studentData.exam ? studentData.exam : '',
    exam_core: studentData.exam_core ? studentData.exam_core : '',
    job: studentData.job ? studentData.job : false,
    business: studentData.business ? studentData.business : false,
    retired: studentData.retired ? studentData.retired : false,
    monthlySalary: studentData.monthlySalary ? studentData.monthlySalary : '',
    salaryInCash: studentData.salaryInCash ? studentData.salaryInCash : false,
    salaryInBank: studentData.salaryInBank ? studentData.salaryInBank : false,
    designation: studentData.designation ? studentData.designation : '',
    bussinessline: studentData.bussinessline ? studentData.bussinessline : '',
    gst: studentData.gst ? studentData.gst : false,
    ssi: studentData.ssi ? studentData.ssi : false,
    professional_tax: studentData.professional_tax ? studentData.professional_tax : false,
    gumastadhara_licence: studentData.gumastadhara_licence ? studentData.gumastadhara_licence : false,
    bussiness_other: studentData.bussiness_other ? studentData.bussiness_other : false,
    bussiness_other_name: studentData.bussiness_other_name ? studentData.bussiness_other_name : '',
    bussinessaccountyes: studentData.bussinessaccountyes ? studentData.bussinessaccountyes : false,
    bussinessaccountno: studentData.bussinessaccountno ? studentData.bussinessaccountno : false,
    loanfacilityyes: studentData.loanfacilityyes ? studentData.loanfacilityyes : false,
    loanfacilityno: studentData.loanfacilityno ? studentData.loanfacilityno : false,
    loanamount: studentData.loanamount ? studentData.loanamount : '',
    emi: studentData.emi ? studentData.emi : '',
    propertyyes: studentData.propertyyes ? studentData.propertyyes : false,
    propertyno: studentData.propertyno ? studentData.propertyno : false,
    house: studentData.house ? studentData.house : false,
    flats: studentData.flats ? studentData.flats : false,
    shop: studentData.shop ? studentData.shop : false,
    plot: studentData.plot ? studentData.plot : false,
    other: studentData.other ? studentData.other : false,
    marketvalue: studentData.marketvalue ? studentData.marketvalue : '',
    otherpropertyname: studentData.otherpropertyname ? studentData.otherpropertyname : '',
    fbinsta: studentData.fbinsta ? studentData.fbinsta : false,
    consultant: studentData.consultant ? studentData.consultant : false,
    consultantname: studentData.consultantname ? studentData.consultantname : '',
    refrenceother: studentData.refrenceother ? studentData.refrenceother : false,
    refrenceothername: studentData.refrenceothername ? studentData.refrenceothername : '',
    agreeconditions: studentData.agreeconditions ? studentData.agreeconditions : false,
    other_earning_member_yes: studentData.other_earning_member_yes ? studentData.other_earning_member_yes : false,
    other_earning_member_no: studentData.other_earning_member_no ? studentData.other_earning_member_no : false,
    other_earning_member_job: studentData.other_earning_member_job ? studentData.other_earning_member_job : false,
    other_earning_member_business: studentData.other_earning_member_business ? studentData.other_earning_member_business : false,
    createdBy: roleData.data._id,

    other_earning_member_monthlySalary: studentData.other_earning_member_monthlySalary
      ? studentData.other_earning_member_monthlySalary
      : '',
    other_earning_member_salaryInCash: studentData.other_earning_member_salaryInCash ? studentData.other_earning_member_salaryInCash : false,
    other_earning_member_salaryInBank: studentData.other_earning_member_salaryInBank ? studentData.other_earning_member_salaryInBank : false,
    other_earning_member_designation: studentData.other_earning_member_designation ? studentData.other_earning_member_designation : '',
    other_earning_member_bussinessline: studentData.other_earning_member_bussinessline ? studentData.other_earning_member_bussinessline : '',
    other_earning_member_gst: studentData.other_earning_member_gst ? studentData.other_earning_member_gst : false,
    other_earning_member_ssi: studentData.other_earning_member_ssi ? studentData.other_earning_member_ssi : false,
    other_earning_member_professional_tax: studentData.other_earning_member_professional_tax ? studentData.other_earning_member_professional_tax : false,
    other_earning_member_gumastadhara_licence: studentData.other_earning_member_gumastadhara_licence ? studentData.other_earning_member_gumastadhara_licence : false,
    other_earning_member_bussiness_other: studentData.other_earning_member_bussiness_other ? studentData.other_earning_member_bussiness_other : false,
    other_earning_member_bussiness_other_name: studentData.other_earning_member_bussiness_other_name ? studentData.other_earning_member_bussiness_other_name : '',
    other_earning_member_bussinessaccountyes: studentData.other_earning_member_bussinessaccountyes ? studentData.other_earning_member_bussinessaccountyes : false,
    other_earning_member_bussinessaccountno: studentData.other_earning_member_bussinessaccountno ? studentData.other_earning_member_bussinessaccountno : false
  };

  const generateYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1970; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  };
  const yearsArray = generateYearsArray();
  return (
    <>
      <MainCard title={`${studentData.length === 0 ? 'Add' : 'Edit'} Student`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            student_name: Yup.string().required('Name is required'),
            phone: Yup.string().max(10).min(10).required('Phone number is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const valuesWithDetails = { ...values, examinationDetails };
              let response;
              studentData._id
                ? (response = await UpdateFormRequest('/student/editstudent/', valuesWithDetails, studentData._id))
                : (response = await PostRequest('/student/addstudent', valuesWithDetails));
              if (response && response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/student');
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
              <Grid item xs={12} mb={2}>
                <Grid container spacing={gridSpacing}>
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

                {examinationDetails?.map((element, index) => (
                  <Grid container spacing={2} key={index} mb={2}>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          id={`examination_${index}`}
                          value={element.examination}
                          name={`examination`}
                          onChange={(e) => handleChangeDetail(index, e)}
                          label="Education"
                          variant="outlined"
                          type="text"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <InputLabel outlined>Passing Year</InputLabel>
                        <Select
                          id={`passingYear_${index}`}
                          value={element.passingYear}
                          label="Passing Year"
                          onChange={(e) => handleChangeDetail(index, e)}
                          name={`passingYear`}
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          {yearsArray.map((year, index) => (
                            <MenuItem key={index} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          id={`percentage_${index}`}
                          value={element.percentage}
                          name={`percentage`}
                          onChange={(e) => handleChangeDetail(index, e)}
                          label="Percentage"
                          variant="outlined"
                          type="text"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth>
                        <TextField
                          id={`school_name${index}`}
                          value={element.school_name}
                          name={`school_name`}
                          onChange={(e) => handleChangeDetail(index, e)}
                          label="School/University Name"
                          variant="outlined"
                          type="text"
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
                                checked={values.salaryInCash || false}
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
                                checked={values.salaryInBank || false}
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
                            placeholder="Ex. Diamond,Textile etc."
                          />
                          <FormLabel component="legend">Any Bussiness proof form below</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.gst || false}
                                onChange={handleChange}
                                name="gst"
                                color="primary"
                                disabled={values.ssi || values.gumastadhara_licence || values.professional_tax || values.bussiness_other}
                              />
                            }
                            label="GST"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.ssi || false}
                                onChange={handleChange}
                                name="ssi"
                                color="primary"
                                disabled={values.gst || values.gumastadhara_licence || values.professional_tax || values.bussiness_other}
                              />
                            }
                            label="SSI"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.professional_tax || false}
                                onChange={handleChange}
                                name="professional_tax"
                                color="primary"
                                disabled={values.gst || values.gumastadhara_licence || values.ssi || values.bussiness_other}
                              />
                            }
                            label="Professional Tax"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.gumastadhara_licence || false}
                                onChange={handleChange}
                                name="gumastadhara_licence"
                                color="primary"
                                disabled={values.gst || values.professional_tax || values.ssi || values.bussiness_other}
                              />
                            }
                            label="Gumastadhara Licence"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.bussiness_other || false}
                                onChange={handleChange}
                                name="bussiness_other"
                                color="primary"
                                disabled={values.gst || values.professional_tax || values.ssi || values.gumastadhara_licence}
                              />
                            }
                            label="Other"
                          />
                          {values.bussiness_other && (
                            <TextField
                              type="text"
                              id="bussiness_other_name"
                              name="bussiness_other_name"
                              label="Other Proof"
                              value={values.bussiness_other_name}
                              onChange={handleChange}
                              variant="outlined"
                              margin="normal"
                            />
                          )}
                          <FormLabel component="legend">Business has Current A/C?</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.bussinessaccountyes || false}
                                onChange={handleChange}
                                name="bussinessaccountyes"
                                color="primary"
                                disabled={values.bussinessaccountno}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.bussinessaccountno || false}
                                onChange={handleChange}
                                name="bussinessaccountno"
                                color="primary"
                                disabled={values.bussinessaccountyes}
                              />
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
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormLabel component="legend">Any Loan Facility Availed?</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.loanfacilityyes || false}
                            onChange={handleChange}
                            name="loanfacilityyes"
                            color="primary"
                            disabled={values.loanfacilityno}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.loanfacilityno || false}
                            onChange={handleChange}
                            name="loanfacilityno"
                            color="primary"
                            disabled={values.loanfacilityyes}
                          />
                        }
                        label="No"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {values.loanfacilityyes ? (
                        <>
                          <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                type="text"
                                id="loanamount"
                                name="loanamount"
                                label="Loan Amount"
                                min={0}
                                value={values.loanamount}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                type="text"
                                id="emi"
                                name="emi"
                                label="EMI"
                                value={values.emi}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                              />
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                      <FormLabel component="legend">Any Other earning member in family?</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.other_earning_member_yes || false}
                            onChange={handleChange}
                            name="other_earning_member_yes"
                            color="primary"
                            disabled={values.other_earning_member_no}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.other_earning_member_no || false}
                            onChange={handleChange}
                            name="other_earning_member_no"
                            color="primary"
                            disabled={values.other_earning_member_yes}
                          />
                        }
                        label="No"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      {values.other_earning_member_yes && (
                        <>
                          <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={3}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={values.other_earning_member_job || false}
                                    onChange={handleChange}
                                    name="other_earning_member_job"
                                    color="primary"
                                    disabled={values.other_earning_member_business}
                                  />
                                }
                                label="Job"
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={values.other_earning_member_business || false}
                                    onChange={handleChange}
                                    name="other_earning_member_business"
                                    color="primary"
                                    disabled={values.other_earning_member_job}
                                  />
                                }
                                label="Business"
                              />
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {values.other_earning_member_job ? (
                        <>
                          <TextField
                            type="number"
                            id="other_earning_member_monthlySalary"
                            name="other_earning_member_monthlySalary"
                            label="Monthly Salary"
                            value={values.other_earning_member_monthlySalary}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_salaryInCash || false}
                                onChange={handleChange}
                                name="other_earning_member_salaryInCash"
                                color="primary"
                                disabled={values.other_earning_member_salaryInBank}
                              />
                            }
                            label="Salary in Cash"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_salaryInBank || false}
                                onChange={handleChange}
                                name="other_earning_member_salaryInBank"
                                color="primary"
                                disabled={values.other_earning_member_salaryInCash}
                              />
                            }
                            label="Salary in Bank"
                          />
                          <TextField
                            id="other_earning_member_designation"
                            name="other_earning_member_designation"
                            label="Designation"
                            value={values.other_earning_member_designation}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                          />
                        </>
                      ) : values.other_earning_member_business ? (
                        <>
                          <TextField
                            type="text"
                            id="other_earning_member_bussinessline"
                            name="other_earning_member_bussinessline"
                            label="Line of Bussiness"
                            value={values.other_earning_member_bussinessline}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            placeholder="Ex. Diamond,Textile etc."
                          />
                          <FormLabel component="legend">Any Bussiness proof form below</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_gst || false}
                                onChange={handleChange}
                                name="other_earning_member_gst"
                                color="primary"
                                disabled={
                                  values.other_earning_member_ssi ||
                                  values.other_earning_member_gumastadhara_licence ||
                                  values.other_earning_member_professional_tax ||
                                  values.other_earning_member_bussiness_other
                                }
                              />
                            }
                            label="GST"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_ssi || false}
                                onChange={handleChange}
                                name="other_earning_member_ssi"
                                color="primary"
                                disabled={
                                  values.other_earning_member_gst ||
                                  values.other_earning_member_gumastadhara_licence ||
                                  values.other_earning_member_professional_tax ||
                                  values.other_earning_member_bussiness_other
                                }
                              />
                            }
                            label="SSI"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_professional_tax || false}
                                onChange={handleChange}
                                name="other_earning_member_professional_tax"
                                color="primary"
                                disabled={
                                  values.other_earning_member_gst ||
                                  values.other_earning_member_gumastadhara_licence ||
                                  values.other_earning_member_ssi ||
                                  values.other_earning_member_bussiness_other
                                }
                              />
                            }
                            label="Professional Tax"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_gumastadhara_licence || false}
                                onChange={handleChange}
                                name="other_earning_member_gumastadhara_licence"
                                color="primary"
                                disabled={
                                  values.other_earning_member_gst ||
                                  values.other_earning_member_professional_tax ||
                                  values.other_earning_member_ssi ||
                                  values.other_earning_member_bussiness_other
                                }
                              />
                            }
                            label="Gumastadhara Licence"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_bussiness_other || false}
                                onChange={handleChange}
                                name="other_earning_member_bussiness_other"
                                color="primary"
                                disabled={
                                  values.other_earning_member_gst ||
                                  values.other_earning_member_professional_tax ||
                                  values.other_earning_member_ssi ||
                                  values.other_earning_member_gumastadhara_licence
                                }
                              />
                            }
                            label="Other"
                          />
                          {values.other_earning_member_bussiness_other && (
                            <TextField
                              type="text"
                              id="other_earning_member_bussiness_other_name"
                              name="other_earning_member_bussiness_other_name"
                              label="Other Proof"
                              value={values.other_earning_member_bussiness_other_name}
                              onChange={handleChange}
                              variant="outlined"
                              margin="normal"
                            />
                          )}
                          <FormLabel component="legend">Business has Current A/C?</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_bussinessaccountyes || false}
                                onChange={handleChange}
                                name="other_earning_member_bussinessaccountyes"
                                color="primary"
                                disabled={values.other_earning_member_bussinessaccountno}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other_earning_member_bussinessaccountno || false}
                                onChange={handleChange}
                                name="other_earning_member_bussinessaccountno"
                                color="primary"
                                disabled={values.other_earning_member_bussinessaccountyes}
                              />
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

              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Property Information (If Any)
                </Typography>

                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                      <FormLabel component="legend">Have You any property to offer as a security?</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.propertyyes || false}
                            onChange={handleChange}
                            name="propertyyes"
                            color="primary"
                            disabled={values.propertyno}
                          />
                        }
                        label="Yes"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.propertyno || false}
                            onChange={handleChange}
                            name="propertyno"
                            color="primary"
                            disabled={values.propertyyes}
                          />
                        }
                        label="No"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {values.propertyyes ? (
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.house || false}
                                onChange={handleChange}
                                name="house"
                                color="primary"
                                disabled={values.flats || values.shop || values.plot || values.other}
                              />
                            }
                            label="House / Banglow"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.flats || false}
                                onChange={handleChange}
                                name="flats"
                                color="primary"
                                disabled={values.house || values.shop || values.plot || values.other}
                              />
                            }
                            label="Flat"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.shop || false}
                                onChange={handleChange}
                                name="shop"
                                color="primary"
                                disabled={values.flats || values.house || values.plot || values.other}
                              />
                            }
                            label="Shop"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.plot || false}
                                onChange={handleChange}
                                name="plot"
                                color="primary"
                                disabled={values.flats || values.shop || values.house || values.other}
                              />
                            }
                            label="Plot"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.other || false}
                                onChange={handleChange}
                                name="other"
                                color="primary"
                                disabled={values.flats || values.shop || values.plot || values.house}
                              />
                            }
                            label="Other"
                          />
                          <Grid item xs={12} mb={2}>
                            <Grid container spacing={gridSpacing}>
                              <Grid item xs={12} md={7}>
                                {values.other && (
                                  <TextField
                                    id="outlined-adornment-otherpropertyname-login"
                                    type="text"
                                    value={values.otherpropertyname}
                                    name="otherpropertyname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Other Property name"
                                    variant="outlined" // Add this line
                                  />
                                )}
                              </Grid>
                              <Grid item xs={12} md={5}>
                                {(values.flats || values.shop || values.plot || values.other || values.house) && (
                                  <TextField
                                    id="outlined-adornment-consultantname-login"
                                    type="text"
                                    value={values.marketvalue}
                                    name="marketvalue"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Approx Market Value"
                                    variant="outlined" // Add this line
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                      <FormLabel component="legend">From Where you got our reference?</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.fbinsta || false}
                            onChange={handleChange}
                            name="fbinsta"
                            color="primary"
                            disabled={values.consultant || values.refrenceother}
                          />
                        }
                        label="FB / Instagram"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.consultant || false}
                            onChange={handleChange}
                            name="consultant"
                            color="primary"
                            disabled={values.fbinsta || values.refrenceother}
                          />
                        }
                        label="Consultant"
                      />
                      {values.consultant && (
                        <TextField
                          id="outlined-adornment-consultantname-login"
                          type="text"
                          value={values.consultantname}
                          name="consultantname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Consultant Name"
                          variant="outlined" // Add this line
                        />
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.refrenceother || false}
                            onChange={handleChange}
                            name="refrenceother"
                            color="primary"
                            disabled={values.fbinsta || values.consultant}
                          />
                        }
                        label="Other (Name)"
                      />
                      {values.refrenceother && (
                        <TextField
                          id="outlined-adornment-refrenceothername-login"
                          type="text"
                          value={values.refrenceothername}
                          name="refrenceothername"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Other Name"
                          variant="outlined" // Add this line
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.agreeconditions || false}
                            onChange={handleChange}
                            name="agreeconditions"
                            color="primary"
                          />
                        }
                        label="I agree to permit my information given above to share with banks/NBFCs for the purpose of loan application. So that a staff/representative/executive of the NBFCs contact me."
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
      <AlertComponent />
    </>
  );
};

export default AddEditStudent;
