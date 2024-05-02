import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Typography,
  IconButton,
  Card,
  Grid,
  CardContent,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  FormControlLabel,
  Checkbox,
  FormLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack } from '@mui/system';
import { gridSpacing } from 'store/constant';

const StudentDetails = ({ open, handleClose, selectedLead }) => {
  //   const tokenValue = localStorage.getItem('token');
  //   const userData = JSON.parse(tokenValue);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'dialogNoRadius' }}>
        <DialogTitle sx={{ backgroundColor: '#070d59' }}>
          <Typography variant="h4" color="#ffffff">
            Student Details
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 13,
            borderRadius: '2px',
            color: '#070d59',
            backgroundColor: '#ffffff',
            transition: 'transform 0.3s ease',
            padding: '0px',
            '&:hover': {
              animation: 'shake 0.5s',
              backgroundColor: '#ffffff'
            },
            '@keyframes shake': {
              '0%': {
                transform: 'translateX(0)'
              },
              '25%': {
                transform: 'translateX(5px)'
              },
              '50%': {
                transform: 'translateX(-5px)'
              },
              '75%': {
                transform: 'translateX(5px)'
              },
              '100%': {
                transform: 'translateX(0)'
              }
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <Card sx={{ overflow: 'scroll' }}>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Student Information
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={4}>
                  <Stack sx={{ marginTop: '10px' }}>
                    <TextField
                      id="outlined-adornment-resident_address-login"
                      value={selectedLead.student_name}
                      label="Student Name"
                      disabled
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack sx={{ marginTop: '10px' }}>
                    <TextField id="outlined-adornment-resident_address-login" value={selectedLead.phone} label="Phone number" disabled />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack sx={{ marginTop: '10px' }}>
                    <TextField id="outlined-adornment-resident_address-login" value={selectedLead.email} label="Email" disabled />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Study Information
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={3}>
                  <Stack>
                    <TextField id="outlined-adornment-resident_address-login" value={selectedLead.country} label="Country" disabled />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Stack>
                    <TextField
                      id="outlined-adornment-resident_address-login"
                      value={selectedLead.universityDetails?.university_name}
                      label="University"
                      disabled
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack>
                    <TextField
                      id="outlined-adornment-resident_address-login"
                      value={selectedLead.course_name}
                      label="Course Name"
                      disabled
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack>
                    <TextField
                      id="outlined-adornment-resident_address-login"
                      value={selectedLead.student_name}
                      label="Course Type"
                      disabled
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack>
                    <TextField id="outlined-adornment-resident_address-login" value={selectedLead.last_study} label="Last Study" disabled />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Examination Details
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Examination</TableCell>
                          <TableCell>Passing Year</TableCell>
                          <TableCell>Percentage</TableCell>
                          <TableCell>School/University</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedLead.education?.length > 0 &&
                          selectedLead.education?.map((option, index) => (
                            <TableRow key={index}>
                              <TableCell>{option.examination}</TableCell>
                              {/* Assuming `option.year` and `option.percentage` are properties of each education item */}
                              <TableCell>{option.passingYear}</TableCell>
                              <TableCell>{option.percentage}</TableCell>
                              <TableCell>{option.school_name}</TableCell>
                            </TableRow>
                          ))}
                        {/* Render a placeholder row if there are no education items */}
                        {selectedLead.education?.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4}>No education records found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack>
                    <TextField id="outlined-adornment-resident_address-login" value={selectedLead.exam} label="Exam" disabled />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack>
                    <TextField id="outlined-adornment-resident_address-login" value={selectedLead.exam_core} label="Exam Score" disabled />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Parents Information
              </Typography>
              <Grid container spacing={gridSpacing}>
                {selectedLead.job && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                      Father Profession - If Job
                    </Typography>
                    <TextField id="monthlySalary" label="Monthly Salary" value={selectedLead.monthlySalary} fullWidth disabled />
                    <FormControlLabel
                      control={<Checkbox checked={selectedLead.salaryInCash} color="primary" disabled={selectedLead.salaryInBank} />}
                      label="Salary in Cash"
                      disabled
                    />
                    <FormControlLabel
                      control={<Checkbox checked={selectedLead.salaryInBank} color="primary" disabled={selectedLead.salaryInCash} />}
                      label="Salary in Bank"
                      disabled
                    />
                    <TextField id="designation" label="Designation" value={selectedLead.designation} margin="normal" fullWidth disabled />
                  </Grid>
                )}
                {selectedLead.business && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                      Father Profession - If Bussiness
                    </Typography>
                    <TextField
                      type="text"
                      id="bussinessline"
                      label="Line of Bussiness"
                      value={selectedLead.bussinessline}
                      fullWidth
                      disabled
                    />
                    <FormLabel component="legend">Any Bussiness proof form below</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.gst}
                          color="primary"
                          disabled={selectedLead.ssi || selectedLead.gumastadhara_licence || selectedLead.professional_tax}
                        />
                      }
                      label="GST"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.ssi}
                          name="ssi"
                          color="primary"
                          disabled={selectedLead.gst || selectedLead.gumastadhara_licence || selectedLead.professional_tax}
                        />
                      }
                      label="SSI"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.professional_tax}
                          color="primary"
                          disabled={selectedLead.gst || selectedLead.gumastadhara_licence || selectedLead.ssi}
                        />
                      }
                      label="Professional Tax"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.gumastadhara_licence}
                          color="primary"
                          disabled={selectedLead.gst || selectedLead.professional_tax || selectedLead.ssi}
                        />
                      }
                      label="Gumastadhara Licence"
                      disabled
                    />
                    <FormLabel component="legend">Business has Current A/C?</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedLead.bussinessaccountyes} color="primary" disabled={selectedLead.bussinessaccountno} />
                      }
                      label="Yes"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedLead.bussinessaccountno} color="primary" disabled={selectedLead.bussinessaccountyes} />
                      }
                      label="No"
                      disabled
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" gutterBottom>
                        Any Loan Facility Availed?
                      </Typography>
                      <FormControlLabel
                        control={<Checkbox checked={selectedLead.loanfacilityyes} color="primary" />}
                        label="Yes"
                        disabled
                      />
                      <FormControlLabel control={<Checkbox checked={selectedLead.loanfacilityno} color="primary" />} label="No" disabled />
                    </Grid>
                    {selectedLead.loanfacilityyes && (
                      <Grid item xs={12} md={12}>
                        <Grid container spacing={gridSpacing}>
                          <Grid item xs={12} md={6}>
                            <TextField id="loanamount" label="Loan Amount" value={selectedLead.loanamount} disabled />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField id="emi" label="EMI" value={selectedLead.emi} disabled />
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="otherearningmember"
                        value={selectedLead.otherearningmember}
                        label="Any Other earning member in family?"
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Property Information (If Any)
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={5}>
                  <FormLabel component="legend">Have You any property to offer as a security?</FormLabel>
                  <FormControlLabel control={<Checkbox checked={selectedLead.propertyyes} color="primary" />} label="Yes" disabled />

                  <FormControlLabel control={<Checkbox checked={selectedLead.propertyno} color="primary" />} label="No" disabled />
                </Grid>
                {selectedLead.propertyyes && (
                  <Grid item xs={12} md={7}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.house}
                          color="primary"
                          disabled={selectedLead.flats || selectedLead.shop || selectedLead.plot || selectedLead.other}
                        />
                      }
                      label="House / Banglow"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.flats}
                          color="primary"
                          disabled={selectedLead.house || selectedLead.shop || selectedLead.plot || selectedLead.other}
                        />
                      }
                      label="Flat"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.shop}
                          color="primary"
                          disabled={selectedLead.flats || selectedLead.house || selectedLead.plot || selectedLead.other}
                        />
                      }
                      label="Shop"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.plot}
                          color="primary"
                          disabled={selectedLead.flats || selectedLead.shop || selectedLead.house || selectedLead.other}
                        />
                      }
                      label="Plot"
                      disabled
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedLead.other}
                          color="primary"
                          disabled={selectedLead.flats || selectedLead.shop || selectedLead.plot || selectedLead.house}
                        />
                      }
                      label="Other"
                      disabled
                    />
                    <Grid container spacing={gridSpacing}>
                      {selectedLead.other && (
                        <Grid item xs={12} md={6}>
                          <TextField id="otherearningmember" value={selectedLead.otherpropertyname} label="Other Property name" disabled />
                        </Grid>
                      )}
                      {(selectedLead.flats || selectedLead.shop || selectedLead.house || selectedLead.other || selectedLead.plot) && (
                        <Grid item xs={12} md={6}>
                          <TextField id="otherearningmember" value={selectedLead.marketvalue} label="Approx Market Value" disabled />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                )}
                <Divider />
                <Grid item xs={12} md={7}>
                  <FormLabel component="legend">From Where you got our reference?</FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedLead.fbinsta}
                        color="primary"
                        disabled={selectedLead.consultant || selectedLead.refrenceother}
                      />
                    }
                    label="FB / Instagram"
                    disabled
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedLead.consultant}
                        color="primary"
                        disabled={selectedLead.fbinsta || selectedLead.refrenceother}
                      />
                    }
                    label="Consultant"
                    disabled
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedLead.refrenceother}
                        color="primary"
                        disabled={selectedLead.fbinsta || selectedLead.consultant}
                      />
                    }
                    label="Other (Name)"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={5} sx={{ mt: 2 }}>
                  <Grid container spacing={gridSpacing}>
                    {selectedLead.consultant && (
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="outlined-adornment-consultantname-login"
                          type="text"
                          value={selectedLead.consultantname}
                          label="Consultant Name"
                          variant="outlined" // Add this line
                          disabled
                        />
                      </Grid>
                    )}
                    {selectedLead.refrenceother && (
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="outlined-adornment-refrenceothername-login"
                          type="text"
                          value={selectedLead.refrenceothername}
                          label="Other Name"
                          variant="outlined" // Add this line
                          disabled
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={<Checkbox checked={selectedLead.agreeconditions} color="primary" />}
                  label="I agree to permit my information given above to share with banks/NBFCs for the purpose of loan application. So that a staff/representative/executive of the NBFCs contact me."
                  disabled
                />
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default StudentDetails;
