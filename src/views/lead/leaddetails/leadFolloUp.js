import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import moment from 'moment';
import { useEffect, useState } from 'react';

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
                {leadFollowUp.userDetails.user_name} {moment(leadFollowUp.createdAt).format('MM-DD-YYYY hh:mm A')}
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Next Followup Date
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {moment(leadFollowUp.next_followup_date).format('MM-DD-YYYY HH:mm A')}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="h4" lineHeight={2.5} color={'#756d6d'}>
                    Comment
                  </Typography>
                  <Typography variant="h5" color="grey" pb={1}>
                    {leadFollowUp.comment}
                  </Typography>
                </Box>
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
