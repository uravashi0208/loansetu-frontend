// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import config from '../../../../config';
import axios from 'axios';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthResetPassword = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location.state && location.state.email;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          password:'',
          confirmpassword:'',
          submit: null
        }}
         validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const response = await axios.post(`${config.backendUrl}/reserpassword`, {
              email,password: values.password
            });
            if (response.data.response === true) {
              setLoading(false);
              Swal.fire({
                title: "Success",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                navigate('/login');
              });
            }
            else{
              setLoading(false);
              Swal.fire({
                title: "Error",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          } catch (err) {
            setLoading(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate autoComplete='off' onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
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
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.confirmpassword && errors.confirmpassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmpassword}
                name="confirmpassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                      size="large"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.confirmpassword && errors.confirmpassword && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.v}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={loading} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthResetPassword;
