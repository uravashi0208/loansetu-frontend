import { Card, CardHeader, CardContent, Divider, Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  TextField,
  CircularProgress
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import config from '../../config';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { useAlert } from 'ui-component/alert/alert';

const ChangePassword = () => {
  const [userData, setUserData] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const tokenValue = localStorage.getItem('token');
      setUserData(JSON.parse(tokenValue));
    }
  }, []);

  const initialValues = {
    password: '',
    newpassword: '',
    confirmpassword: '',
    submit: null
  };
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                border: '1px solid rgb(227, 232, 239)'
              }}
            >
              <CardHeader sx={{ padding: '12px' }} title={'Change Password'} />
              <Divider />
              <CardContent>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    password: Yup.string().required('Password is required'),
                    newpassword: Yup.string().required('New Password is required'),
                    confirmpassword: Yup.string()
                      .required('Confirm Password is required')
                      .test('passwords-match', 'Passwords do not match', function (value) {
                        return this.parent.newpassword === value;
                      })
                  })}
                  onSubmit={async (values) => {
                    try {
                      setLoading(true);
                      const response = await axios.post(`${config.backendUrl}/reserpassword`, {
                        email: userData?.data?.email,
                        password: values.password
                      });
                      if (response.data.response === true) {
                        setLoading(false);
                        showAlert(response.data.message, 'success');
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
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                      <FormControl sx={{ marginBottom: '20px' }} fullWidth error={Boolean(touched.password && errors.password)}>
                        <TextField
                          id="outlined-adornment-email-login"
                          type="password"
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Current Password"
                          error={Boolean(touched.password && errors.password)}
                          variant="outlined" // Add this line
                        />

                        {touched.password && errors.password && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.password}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.newpassword && errors.newpassword)}>
                              <TextField
                                id="outlined-adornment-email-login"
                                type="password"
                                value={values.newpassword}
                                name="newpassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="New Password"
                                error={Boolean(touched.newpassword && errors.newpassword)}
                                variant="outlined" // Add this line
                              />
                              {touched.newpassword && errors.newpassword && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                  {errors.newpassword}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.confirmpassword && errors.confirmpassword)}>
                              <TextField
                                id="outlined-adornment-email-login"
                                type="password"
                                value={values.confirmpassword}
                                name="confirmpassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Confirm Password"
                                error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                                variant="outlined" // Add this line
                              />
                              {touched.confirmpassword && errors.confirmpassword && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                  {errors.confirmpassword}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>

                      {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                      )}

                      <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                          <Button
                            disableElevation
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                          >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Change Password'}
                          </Button>
                        </AnimateButton>
                      </Box>
                    </form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                border: '1px solid rgb(227, 232, 239)'
              }}
            >
              <CardHeader sx={{ padding: '12px' }} title={'Delete Account'} />
              <Divider />
              <CardContent>
                <Typography>
                  To deactivate your account, first delete its resources. If you are the only owner of any teams, either assign another
                  owner or deactivate the team.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button disableElevation size="small" type="submit" variant="outlined" color="error">
                      Deactivate Account
                    </Button>
                  </AnimateButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <AlertComponent />
    </>
  );
};

export default ChangePassword;