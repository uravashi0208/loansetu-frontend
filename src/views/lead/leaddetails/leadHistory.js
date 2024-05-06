import { useTheme } from '@mui/material/styles';
import { Avatar, Card, CircularProgress, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import moment from 'moment';
import { Box } from '@mui/system';

const LeadHistory = ({ selectedLead }) => {
  const theme = useTheme();
  const [leadHistoryData, setLeadHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllLeadHistory();
  }, []);

  const getAllLeadHistory = async () => {
    const leadid = selectedLead._id;
    setLoading(true);
    const response = await GetRequestOnRole('/student/getleadhistory/', leadid);
    if (response.data) {
      setLeadHistoryData(response.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : leadHistoryData.length > 0 ? (
        <Card
          sx={{
            borderColor: theme.palette.primary[200] + 25,
            boxShadow: '0 4px 20px 0 rgb(4 8 10 / 20%)'
          }}
        >
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {leadHistoryData.map((leadHistory) => (
              <ListItem alignItems="flex-start" key={leadHistory._id}>
                <ListItemAvatar>
                  <Avatar
                    alt={leadHistory.userDetails.user_name || leadHistory.userDetails.company_name}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={leadHistory.userDetails.user_name || leadHistory.userDetails.company_name}
                  secondary={<React.Fragment>{leadHistory.message}</React.Fragment>}
                />
                <ListItemText secondary={moment(leadHistory.createdAt).format('MM-DD-YYYY HH:mm A')} sx={{ textAlign: 'center' }} />
              </ListItem>
            ))}
          </List>
        </Card>
      ) : (
        <Box sx={{ width: '100%', typography: 'subtitle1', textAlign: 'center' }}>No Data found</Box>
      )}
    </>
  );
};

export default LeadHistory;
