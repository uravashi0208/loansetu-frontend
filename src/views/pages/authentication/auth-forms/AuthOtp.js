// material-ui
import {
  Box,
  Button,
  FormHelperText,
  CircularProgress
} from '@mui/material';

// third party
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import config from '../../../../config';
import axios from 'axios';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OtpInput from 'react-otp-input';

const AuthOtp = ({ ...others }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(0);
    const location = useLocation();
    const email = location.state && location.state.email;
    return (
    <>
        <Formik
            initialValues={{
                submit: null
            }}
            onSubmit={async () => {
            try {
                setLoading(true);   
                const response = await axios.post(`${config.backendUrl}/verify-otp`, {
                   otp, email
                });
                if (response.data.response === true) {
                    setLoading(false);   
                    Swal.fire({ 
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        navigate('/reset-password', { state: { email } });
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
            {({ errors, handleSubmit }) => (
            <form noValidate autoComplete='off' onSubmit={handleSubmit} {...others}>
                <OtpInput
                    type="number"
                    inputStyle={{
                        width: "2em",
                        height: "2em",
                        margin: "20px 1rem",
                        fontSize: "2em",
                        borderRadius: 4,
                        border: "2px solid rgba(0,0,0,0.3)"
                    }}
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                />
                
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

export default AuthOtp;
