// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Input,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Divider
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { IconUpload } from '@tabler/icons-react';
import PostRequestFormData from 'commonRequest/postRequestFormData';
import GetRequest from 'commonRequest/getRequest';
import { useLocation, useNavigate } from 'react-router';
import GetByIdRequest from 'commonRequest/getByIdRequest';

// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const StaffProfile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [branchLocation, setBranchLocation] = useState([]);
  const [selectedPanImage, setSelectedPanImage] = useState(null);
  const [selectedAadharImage, setSelectedAadharImage] = useState(null);
  const [selectedContractPdf, setSelectedContractPdf] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getAllBranchLocation();
    if (location && location.state !== null) {
      getBranchById(location.state);
    }
  }, []);

  const getBranchById = async (id) => {
    const response = await GetByIdRequest('/staff/getstaffbyid/', id);
    setStaffData(response.data);
    setSelectedImage(response.data.image);
  };

  const getAllBranchLocation = async () => {
    const response = await GetRequest('/branchlocation/getbranchlocation');
    if (response.data) {
      setBranchLocation(response.data);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    first_name: staffData.first_name ? staffData.first_name : '',
    last_name: staffData.last_name ? staffData.last_name : '',
    email: staffData.email ? staffData.email : '',
    rate: staffData.rate ? staffData.rate : '',
    phone: staffData.phone ? staffData.phone : '',
    password: staffData.password ? staffData.password : '',
    company_email: staffData.company_email ? staffData.company_email : '',
    emailsignature: staffData.emailsignature ? staffData.emailsignature : '',
    isAdmin: staffData.isAdmin ? staffData.isAdmin : false,
    isStaff: staffData.isStaff ? staffData.isStaff : false,
    isSendWelcomeMail: staffData.isSendWelcomeMail ? staffData.isSendWelcomeMail : true,
    image: staffData.image ? staffData.image : '',
    staff_team: staffData.staff_team ? staffData.staff_team : '',
    father_name: staffData.father_name ? staffData.father_name : '',
    father_phone: staffData.father_phone ? staffData.father_phone : '',
    address: staffData.address ? staffData.address : '',
    pan_number: staffData.pan_number ? staffData.pan_number : '',
    aadhar_number: staffData.aadhar_number ? staffData.aadhar_number : '',
    uan_number: staffData.uan_number ? staffData.uan_number : '',
    pan_image: staffData.pan_image ? staffData.pan_image : '',
    aadhar_image: staffData.aadhar_image ? staffData.aadhar_image : '',
    contract_pdf: staffData.contract_pdf ? staffData.contract_pdf : '',
    branchlocation: staffData.branchlocation ? staffData.branchlocation : '',
    submit: null
  };
  return (
    <MainCard title={`${staffData === '' ? 'Add' : 'Edit'} Staff`}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('First name is required'),
          last_name: Yup.string().required('Last name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          phone: Yup.string().max(10).min(10).required('Phone number is required'),
          password: Yup.string().max(255).required('Password is required'),
          image: Yup.string().required('Please upload profile pic.'),
          staff_team: Yup.string().max(255).required('Team is required'),
          pan_number: Yup.string().max(255).required('PAN number is required'),
          aadhar_number: Yup.string().max(255).required('Aadhar number is required'),
          aadhar_image: Yup.string().required('Aadhar image is required'),
          pan_image: Yup.string().required('PAN image is required'),
          contract_pdf: Yup.string().required('Please upload contract pdf file.')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              if (key === 'image' && values[key]) {
                // Handle file separately
                formData.append(key, values[key], values[key].name);
              } else if (key === 'pan_image' && values[key]) {
                // Handle file separately
                formData.append(key, values[key], values[key].name);
              } else if (key === 'aadhar_image' && values[key]) {
                // Handle file separately
                formData.append(key, values[key], values[key].name);
              } else if (key === 'contract_pdf' && values[key]) {
                // Handle file separately
                formData.append(key, values[key], values[key].name);
              } else {
                formData.append(key, values[key]);
              }
            });
            const response = await PostRequestFormData('/staff/addstaff', formData);
            if (response && response.response === true) {
              Swal.fire({
                title: 'Success',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                navigate('/staff');
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: response.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          } catch (err) {
            setSubmitting(false);
            setStatus({ success: false });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>

              <FormControl fullWidth sx={{ mb: '10px', display: '-webkit-box', flexDirection: 'column' }}>
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginRight: '20px',
                    border: '2px solid #ccc', // Add border for circular effect
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {selectedImage instanceof File ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    selectedImage && (
                      <img
                        src={`http://localhost:8000/uploads/staff/${selectedImage}`}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                      />
                    )
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="profile-image-upload">
                    <Button color="secondary" variant="outlined" component="span">
                      <IconUpload stroke={2} />
                      Upload Profile
                    </Button>
                  </label>
                  <Input
                    id="profile-image-upload"
                    type="file"
                    accept="image/jpeg, image/png,image/jpg"
                    onChange={(event) => {
                      setSelectedImage(event.currentTarget.files[0]);
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                    style={{ display: 'none' }}
                  />
                  {touched.image && errors.image && (
                    <FormHelperText error id="standard-weight-helper-text-image-login">
                      {errors.image}
                    </FormHelperText>
                  )}
                </div>
              </FormControl>

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
                  <Grid item xs={12} md={6}>
                    <label htmlFor="pan-upload">
                      <Button color="secondary" variant="outlined" component="span">
                        <IconUpload stroke={2} />
                        Upload PAN card
                      </Button>
                    </label>
                    <Input
                      id="pan-upload"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        setSelectedPanImage(event.currentTarget.files[0].name);
                        setFieldValue('pan_image', event.currentTarget.files[0]);
                      }}
                      style={{ display: 'none' }}
                    />
                    {selectedPanImage && <label style={{ marginLeft: '20px' }}>{selectedPanImage}</label>}
                    {touched.pan_image && errors.pan_image && (
                      <FormHelperText error id="standard-weight-helper-text-pan_image-login">
                        {errors.pan_image}
                      </FormHelperText>
                    )}
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
                  <Grid item xs={12} md={6}>
                    <label htmlFor="aadhar-upload">
                      <Button color="secondary" variant="outlined" component="span">
                        <IconUpload stroke={2} />
                        Upload Aadhar card
                      </Button>
                    </label>
                    <Input
                      id="aadhar-upload"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        setSelectedAadharImage(event.currentTarget.files[0].name);
                        setFieldValue('aadhar_image', event.currentTarget.files[0]);
                      }}
                      style={{ display: 'none' }}
                    />
                    {selectedAadharImage && <label style={{ marginLeft: '20px' }}>{selectedAadharImage}</label>}
                    {touched.aadhar_image && errors.aadhar_image && (
                      <FormHelperText error id="standard-weight-helper-text-aadhar_image-login">
                        {errors.aadhar_image}
                      </FormHelperText>
                    )}
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
                  <Grid item xs={12} md={6}>
                    <label htmlFor="contract-pdf-upload">
                      <Button color="secondary" variant="outlined" component="span">
                        <IconUpload stroke={2} />
                        Upload Contract PDF
                      </Button>
                    </label>
                    <Input
                      id="contract-pdf-upload"
                      type="file"
                      accept="pdf/*"
                      onChange={(event) => {
                        console.log('event.currentTarget.files[0] :', event.currentTarget.files[0].name);
                        setSelectedContractPdf(event.currentTarget.files[0].name);
                        setFieldValue('contract_pdf', event.currentTarget.files[0]);
                      }}
                      style={{ display: 'none' }}
                    />
                    {selectedContractPdf && <label style={{ marginLeft: '20px' }}>{selectedContractPdf}</label>}
                    {touched.contract_pdf && errors.contract_pdf && (
                      <FormHelperText error id="standard-weight-helper-text-contract_pdf-login">
                        {errors.contract_pdf}
                      </FormHelperText>
                    )}
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
                        <MenuItem value={'serice'}>Service</MenuItem>
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
              <Button
                disableElevation
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button disableElevation disabled={isSubmitting} size="large" type="reset" variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default StaffProfile;
