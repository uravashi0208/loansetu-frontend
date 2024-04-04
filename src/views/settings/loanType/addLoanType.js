// material-ui
import { Box, Button, FormControl, FormHelperText, TextField, Grid, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { useLocation, useNavigate } from 'react-router';
import PostRequest from 'commonRequest/postRequest';
import GetByIdRequest from 'commonRequest/getByIdRequest';
import UpdateRequest from 'commonRequest/updateRequest';
import { useAlert } from 'ui-component/alert/alert';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const AddEditLoanType = () => {
  const [loading, setLoading] = useState(false);
  const [loanType, setLoanType] = useState([]);
  const { showAlert, AlertComponent } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state !== null) {
      getLoanTypeById(location.state);
    }
  }, []);

  const getLoanTypeById = async (id) => {
    const response = await GetByIdRequest('/loantype/getloantypebyid/', id);
    setLoanType(response.data);
  };

  const initialValues = {
    loan_type: loanType.loan_type ? loanType.loan_type : '',
    submit: null
  };

  const handleCancelClick = () => {
    navigate('/setting/loantype');
  };
  return (
    <>
      <MainCard title={`${loanType.length === 0 ? 'Add' : 'Edit'} Loan Type`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            loan_type: Yup.string().required('Loan Type is required')
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              let response;
              loanType._id
                ? (response = await UpdateRequest('/loantype/editloantype/', {
                    loan_type: values.loan_type,
                    id: loanType._id
                  }))
                : (response = await PostRequest('/loantype/addloantype', {
                    loan_type: values.loan_type
                  }));
              if (response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/setting/loantype');
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
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ marginBottom: '18px' }} fullWidth error={Boolean(touched.loan_type && errors.loan_type)}>
                      <TextField
                        id="outlined-adornment-loan_type"
                        type="text"
                        value={values.loan_type}
                        name="loan_type"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Loan Type"
                        error={Boolean(touched.loan_type && errors.loan_type)}
                        variant="outlined" // Add this line
                      />
                      {touched.loan_type && errors.loan_type && (
                        <FormHelperText error id="standard-weight-helper-text-loan_type">
                          {errors.loan_type}
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
                <Button disableElevation disabled={loading} size="large" type="submit" variant="contained" color="secondary" sx={{ mr: 2 }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
                <Button disableElevation size="large" type="reset" variant="outlined" color="secondary" onClick={handleCancelClick}>
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

export default AddEditLoanType;
