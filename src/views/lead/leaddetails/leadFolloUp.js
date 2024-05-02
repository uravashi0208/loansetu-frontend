import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Divider, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';

const LeadFollowUp = ({ selectedLead }) => {
  const [leadFollowUpData, setLeadFollowUpData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllLeadHistory();
  }, []);

  const getAllLeadHistory = async () => {
    const leadid = selectedLead._id;
    setLoading(true);
    const response = await GetRequestOnRole('/leadfollowup/getleadfollowup/', leadid);
    if (response.data) {
      setLeadFollowUpData(response.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : leadFollowUpData.length > 0 ? (
          leadFollowUpData.map((leadFollowUp, index) => (
            <Accordion sx={{ marginBottom: '5px' }} key={leadFollowUp._id}>
              <AccordionSummary
                aria-controls={`panel${index}-content`}
                id="panel1-header"
                sx={{
                  backgroundColor: '#070d59',
                  height: '45px',
                  color: '#fff',
                  fontSize: '17px',
                  '&.Mui-expanded': {
                    minHeight: '40px'
                  }
                }}
              >
                {leadFollowUp.userDetails.user_name || leadFollowUp.userDetails.authorised_person_name} - {leadFollowUp.followup_place}{' '}
                {moment(leadFollowUp.createdAt).format('MM-DD-YYYY hh:mm A')}
              </AccordionSummary>
              <AccordionDetails>
                <Grid item xs={12}>
                  <Grid container spacing={gridSpacing}>
                    {leadFollowUp.current_followup_date && (
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                            Current Followup Date
                          </Typography>
                          <Typography variant="h5" color="grey" pb={1}>
                            {moment(leadFollowUp.current_followup_date).format('MM-DD-YYYY HH:mm A')}
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                          Next Followup Date
                        </Typography>
                        <Typography variant="h5" color="grey" pb={1}>
                          {moment(leadFollowUp.next_followup_date).format('MM-DD-YYYY HH:mm A')}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Grid container spacing={gridSpacing}>
                    {leadFollowUp.current_followup_comment && (
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                            Current Followup Comment
                          </Typography>
                          <Typography variant="h5" color="grey" pb={1}>
                            {leadFollowUp.current_followup_comment}
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                          Next Followup Comment
                        </Typography>
                        <Typography variant="h5" color="grey" pb={1}>
                          {leadFollowUp.next_followup_comment}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box sx={{ width: '100%', typography: 'subtitle1', textAlign: 'center' }}>No Data found</Box>
        )}
      </div>
    </>
  );
};

export default LeadFollowUp;
