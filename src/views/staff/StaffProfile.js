// material-ui
import { Box,
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
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import config from '../../config';
import Swal from "sweetalert2";
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import axios from 'axios';

// project imports

// ==============================|| SAMPLE PsAGE ||============================== //

const StaffProfile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [userData, setUserData] = useState([]);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const tokenValue = localStorage.getItem("token");
            setUserData(JSON.parse(tokenValue));
        }
    }, []); 


    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        rate:'',
        phone:'',
        password:'',
        emailsignature:'',
        isAdmin:false,
        isStaff:false,
        isSendWelcomeMail:true,
        image:'',
        submit: null,
    };
    return(
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                first_name: Yup.string().required('First name is required'),
                last_name: Yup.string().required('Last name is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                phone: Yup.string().max(10).min(10).required('Phone number is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
                try {
                    const formData = new FormData();
                    Object.keys(values).forEach((key) => {
                        if (key === 'image' && values[key]) {
                            // Handle file separately
                            formData.append(key, values[key], values[key].name);
                        } else {
                            formData.append(key, values[key]);
                        }
                    });
                    const response = await axios.post(`${config.backendUrl}/addstaff`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${userData.token}`,
                        },
                    });
                    console.log("response :",response);
                    Swal.fire({
                        title: "Success",
                        text: 'sdas',
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } catch (err) {
                    setSubmitting(false);
                    setStatus({ success: false });
                }
            }}
        >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate encType="multipart/form-data" autoComplete='off' onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ marginBottom: '18px' }}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <label htmlFor="image-upload">Profile Image</label>
                                <Input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setSelectedImage(file);

                                        // If you want to store the image in form data, you can set it here
                                        values.image = file;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {selectedImage && (
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', marginTop: '8px', height:'80px' }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </FormControl>

                <FormControl sx={{ marginBottom:'18px'}} fullWidth error={Boolean(touched.first_name && errors.first_name)}>
                    <TextField
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.first_name}
                        name="first_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="First Name"
                        error={Boolean(touched.first_name && errors.first_name)}
                        variant="outlined"  // Add this line
                    />
                    {touched.first_name && errors.first_name && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.first_name}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom:'18px'}} error={Boolean(touched.last_name && errors.last_name)}>
                    <TextField
                        id="outlined-adornment-last_name-login"
                        type="text"
                        value={values.last_name}
                        name="last_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Last Name"
                        error={Boolean(touched.last_name && errors.last_name)}
                        variant="outlined"  // Add this line
                    />
                    {touched.last_name && errors.last_name && (
                        <FormHelperText error id="standard-weight-helper-text-last_name-login">
                        {errors.last_name}
                        </FormHelperText>
                    )}
                    </FormControl>
                <FormControl fullWidth sx={{ marginBottom:'18px'}} error={Boolean(touched.company_email && errors.company_email)}>
                    <TextField
                        id="outlined-adornment-company_email-login"
                        type="email"
                        value={values.company_email}
                        name="company_email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Company Email"
                        variant="outlined"  // Add this line
                    />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom:'18px'}} error={Boolean(touched.email && errors.email)}>
                    <TextField
                        id="outlined-adornment-email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Email"
                        error={Boolean(touched.email && errors.email)}
                        variant="outlined"  // Add this line
                    />
                    {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.email}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom:'18px'}} error={Boolean(touched.password && errors.password)}>
                    <TextField
                        id="outlined-adornment-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Password"
                        error={Boolean(touched.password && errors.password)}
                        variant="outlined"  // Add this line
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

                <FormControl fullWidth sx={{ marginBottom:'18px'}}>
                    <TextField
                        id="outlined-adornment-email-login"
                        type="number"
                        value={values.rate}
                        name="rate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Rate"
                        variant="outlined"  // Add this line
                    />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom:'18px'}} error={Boolean(touched.phone && errors.phone)}>
                    <TextField
                        id="outlined-adornment-email-login"
                        type="number"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Phone Number"
                        error={Boolean(touched.phone && errors.phone)}
                        variant="outlined"  // Add this line
                    />
                    {touched.phone && errors.phone && (
                        <FormHelperText error id="standard-weight-helper-text-phone-login">
                        {errors.phone}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: '18px' }} >
                    <TextField
                        id="outlined-adornment-email-login"
                        multiline
                        value={values.emailsignature}
                        name="emailsignature"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Email Signature"
                        variant="outlined"  // Add this line
                    />
                </FormControl>
                    
                <FormControl fullWidth sx={{ marginBottom:'18px'}}>
                    <TextField
                        id="outlined-adornment-branch_location-login"
                        type="text"
                        value={values.branch_location}
                        name="branch_location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Branch Location"
                        variant="outlined"  // Add this line
                    />
                </FormControl>

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

                {errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
                )}

                <Box sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                        Save
                    </Button>
                </AnimateButton>
                </Box>
            </form>
        )}
        </Formik>
  )
};

export default StaffProfile;
