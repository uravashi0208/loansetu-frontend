import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import GetRequestOnRole from 'commonRequest/getRequestRole';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: 'rgb(244, 67, 54)',
  color: theme.palette.primary.light,
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, #894641 -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, #ffdbd9 -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalCancelLead = ({ isLoading }) => {
  const theme = useTheme();

  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  const [allLeadCount, setAllLeadCount] = useState([]);
  useEffect(() => {
    getAllLeadCount();
  }, []);

  const getAllLeadCount = async () => {
    const userid = userData.data.role === 'Admin' ? 'admin' : userData.data._id;
    const response = await GetRequestOnRole('/dashboardreport/getAllCancelLeadReport/', userid);
    if (response.response === true) {
      setAllLeadCount(response.totalLeads);
    } else {
      setAllLeadCount(0);
    }
  };

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: '#ff6a5f',
                      color: '#fff'
                    }}
                  >
                    <CancelIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                      {allLeadCount}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                      Total Cancel Lead
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalCancelLead.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalCancelLead;
