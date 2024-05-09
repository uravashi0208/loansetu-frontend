import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import { useEffect, useState } from 'react';

// assets

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: 'rgb(103, 58, 183)',
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalAllLead = ({ isLoading }) => {
  const theme = useTheme();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  const [allLeadCount, setAllLeadCount] = useState([]);
  useEffect(() => {
    getAllLeadCount();
  }, []);

  const getAllLeadCount = async () => {
    const userid = userData.data.role === 'Admin' ? 'admin' : userData.data._id;
    const response = await GetRequestOnRole('/dashboardreport/getAllLeadReport/', userid);
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
                      backgroundColor: 'rgb(83 57 131)',
                      color: 'rgb(255 255 255)'
                    }}
                  >
                    <PersonAddOutlinedIcon fontSize="inherit" />
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
                      Total Lead
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

TotalAllLead.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalAllLead;
