import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import config from '../../../../config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'ui-component/alert/alert';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const { showAlert, AlertComponent } = useAlert();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('Firstname is required'),
          lastname: Yup.string().max(255).required('Lastname is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const response = await axios.post(`${config.backendUrl}/register`, {
              user_name: values.firstname + ' ' + values.lastname,
              email: values.email,
              password: values.password
            });
            if (response.data.response === true) {
              localStorage.setItem('token', JSON.stringify(response.data));
              showAlert('Registration successfully', 'success');
              setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');
              }, 1000);
            } else {
              setLoading(false);
              showAlert(response.data.message, 'error');
            }
          } catch (err) {
            setLoading(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-register">First Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="text"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.lastname && errors.lastname)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-register">Last Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="text"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={loading} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign up'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <AlertComponent />
    </>
  );
};

export default FirebaseRegister;
