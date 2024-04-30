import { Box, Button, FormControl, FormHelperText, TextField, Grid, Typography, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { useLocation, useNavigate } from 'react-router';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import { useAlert } from 'ui-component/alert/alert';
import PostRequest from 'commonRequest/postRequest';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';

const AddEditPartner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state !== null) {
      getStudentById(location.state);
    }
  }, []);

  const getStudentById = async (id) => {
    const response = await GetByIdRequest('/student/getstudentbyid/', id);
    if (response.data.country) getUniversitiesByCountry(response.data.country);
    setStudentData(response.data);
  };

  const initialValues = {
    partner_code: studentData.partner_code ? studentData.partner_code : '',
    company_name: studentData.company_name ? studentData.company_name : '',
    authorised_person_name: studentData.authorised_person_name ? studentData.authorised_person_name : '',
    constitution: studentData.constitution ? studentData.constitution : '',
    age: studentData.age ? studentData.age : '',
    address: studentData.address ? studentData.address : '',
    phone: studentData.phone ? studentData.phone : '',
    alternate_contact_number: studentData.alternate_contact_number ? studentData.alternate_contact_number : '',
    pan_number: studentData.pan_number ? studentData.pan_number : '',
    email: studentData.email ? studentData.email : '',
    present_occupation: studentData.present_occupation ? studentData.present_occupation : '',
    rate: studentData.rate ? studentData.rate : '',
    current_employement: studentData.current_employement ? studentData.current_employement : '',
    qualification: studentData.qualification ? studentData.qualification : '',
    language_known: studentData.language_known ? studentData.language_known : '',
    reference_name: studentData.reference_name ? studentData.reference_name : '',
    reference_contact_number: studentData.reference_contact_number ? studentData.reference_contact_number : '',
    bank_name: studentData.bank_name ? studentData.bank_name : '',
    branch_name: studentData.branch_name ? studentData.branch_name : '',
    account_number: studentData.account_number ? studentData.account_number : ''
  };
  return (
    <>
      <MainCard title={`${studentData.length === 0 ? 'Add' : 'Edit'} Partner`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            company_name: Yup.string().required('Company Name is required'),
            authorised_person_name: Yup.string().required('Authorised Person Name is required'),
            phone: Yup.string().max(10).min(10).required('Phone number is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              let response;
              studentData._id
                ? (response = await UpdateFormRequest('/partner/editstudent/', values, studentData._id))
                : (response = await PostRequest('/partner/addpartner', values));
              if (response && response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/partner');
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
                  {/* <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-partner_code"
                        type="text"
                        value={values.partner_code}
                        name="partner_code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Partner Code"
                        variant="outlined" // Add this line
                        disabled
                      />
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={Boolean(touched.company_name && errors.company_name)}>
                      <TextField
                        id="outlined-adornment-company_name"
                        type="text"
                        value={values.company_name}
                        name="company_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Company Name"
                        error={Boolean(touched.company_name && errors.company_name)}
                        variant="outlined" // Add this line
                      />
                      {touched.company_name && errors.company_name && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.company_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={Boolean(touched.authorised_person_name && errors.authorised_person_name)}>
                      <TextField
                        id="outlined-adornment-authorised_person_name"
                        type="text"
                        value={values.authorised_person_name}
                        name="authorised_person_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Authorised Person Name"
                        error={Boolean(touched.authorised_person_name && errors.authorised_person_name)}
                        variant="outlined" // Add this line
                      />
                      {touched.authorised_person_name && errors.authorised_person_name && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.authorised_person_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-constitution"
                        type="text"
                        value={values.constitution}
                        name="constitution"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Constitution"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-dob"
                        type="date"
                        value={values.dob}
                        name="dob"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Date of Birth"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-age"
                        type="number"
                        value={values.age}
                        name="age"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Age"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-address"
                        multiline
                        value={values.address}
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="address"
                        rows={5}
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                            <TextField
                              id="outlined-adornment-phone"
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
                        <Grid item xs={12} md={12}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-alternate_contact_number"
                              type="number"
                              value={values.alternate_contact_number}
                              name="alternate_contact_number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Alternate Contact Number"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-pan_number"
                        type="text"
                        value={values.pan_number}
                        name="pan_number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="PAN Number"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-present_occupation"
                        type="text"
                        value={values.present_occupation}
                        name="present_occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Present Occupation"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-rate"
                        type="text"
                        value={values.rate}
                        name="rate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Present Income"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-current_employement"
                        type="text"
                        value={values.current_employement}
                        name="current_employement"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="No of Years in current employement"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-qualification"
                        type="text"
                        value={values.qualification}
                        name="qualification"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Qualification"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-language_known"
                        type="text"
                        value={values.language_known}
                        name="language_known"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Language Known"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-reference_name"
                        type="text"
                        value={values.reference_name}
                        name="reference_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Reference Name"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-adornment-reference_contact_number"
                        type="text"
                        value={values.reference_contact_number}
                        name="reference_contact_number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Reference Contact Number"
                        variant="outlined" // Add this line
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                  Bank Information
                </Typography>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-bank_name"
                          type="text"
                          value={values.bank_name}
                          name="bank_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Bank Name"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-branch_name"
                          type="text"
                          value={values.branch_name}
                          name="branch_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Branch Name"
                          variant="outlined" // Add this line
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl>
                        <TextField
                          id="outlined-adornment-account_number"
                          type="text"
                          value={values.account_number}
                          name="account_number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Account Number"
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

export default AddEditPartner;
