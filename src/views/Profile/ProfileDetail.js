import { Card, CardHeader, CardContent, Divider, Box,
  Button,
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import config from '../../config';
import Swal from "sweetalert2";
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect, useState } from 'react';
import PostRequest from 'commonRequest/postRequest';

const ProfileDetails = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (localStorage.getItem("token")) {
                const tokenValue = localStorage.getItem("token");
                setUserData(JSON.parse(tokenValue));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

    fetchUserData();
    }, []); 

    const initialValues = {
        user_name: userData?.data?.user_name,
        email: userData?.data?.email || '',
        submit: null,
    };
    return (
        <Card sx={{
          border: '1px solid rgb(227, 232, 239)',
        }}>
            <CardHeader sx={{padding:'12px' }} title={'Edit Account Details'} />
            <Divider />
            <CardContent>
                <Formik
                enableReinitialize
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        user_name: Yup.string().required('Username is required'),
                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    })}
                    onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        const response = await PostRequest(
                            `${config.backendUrl}/updateprofile`,
                            {
                                email: values.email,
                                user_name: values.user_name,
                                userId: userData?.data?._id,
                            },
                            {
                                Authorization: `Bearer ${userData.token}`,
                            }
                        );
                        if (response.response === true) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            Swal.fire({
                                title: "Success",
                                text: response.message,
                                icon: "success",
                                confirmButtonText: "OK",
                            });
                        }
                        else{
                            setStatus({ success: false });
                            setSubmitting(false);
                            Swal.fire({
                                title: "Error",
                                text: response.message,
                                icon: "error",
                                confirmButtonText: "OK",
                            });
                        }
                    } catch (err) {
                        setSubmitting(false);
                        setStatus({ success: false });
                    }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                            <FormControl sx={{ marginBottom:'20px'}} fullWidth error={Boolean(touched.user_name && errors.user_name)}>
                                <TextField
                                    id="outlined-adornment-email-login"
                                    type="text"
                                    value={values.user_name}
                                    name="user_name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Username"
                                    error={Boolean(touched.user_name && errors.user_name)}
                                    variant="outlined"  // Add this line
                                />
                                {touched.user_name && errors.user_name && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.user_name}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                <TextField
                                    id="outlined-adornment-email-login"
                                    type="text"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Email Address"
                                    error={Boolean(touched.email && errors.email)}
                                    variant="outlined"  // Add this line
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
                                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                Chnage Details
                                </Button>
                            </AnimateButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            </CardContent>
        </Card>
     );
};

export default ProfileDetails;