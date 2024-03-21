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
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import config from '../../../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAlert } from 'ui-component/alert/alert';

const AuthForgotPassword = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showAlert, AlertComponent } = useAlert();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const email = values.email;
            const response = await axios.post(`${config.backendUrl}/forgot-password`, {
              email: email
            });
            if (response.data.response === true) {
              showAlert(response.data.message, 'success');
              setTimeout(() => {
                setLoading(false);
                navigate('/otp', { state: { email } });
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
          <form noValidate autoComplete="off" onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
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
      <AlertComponent />
    </>
  );
};

export default AuthForgotPassword;
