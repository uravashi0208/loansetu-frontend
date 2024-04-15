// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material';

// assets
import User1 from 'assets/images/users/user-round.svg';
import { useEffect, useState } from 'react';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const timeDifference = (previous) => {
  const current = new Date();
  const previousDate = new Date(previous);

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previousDate;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
};

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ notificationlist }) => {
  const theme = useTheme();

  const [formattedNotifications, setFormattedNotifications] = useState([]);

  useEffect(() => {
    // Format notifications
    const formatted = notificationlist.map((notification) => ({
      ...notification,
      timeAgo: timeDifference(notification.createdAt)
    }));
    setFormattedNotifications(formatted);
  }, [notificationlist]);

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: '5px'
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 370,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 370
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      {formattedNotifications.map((notification) => (
        <>
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="John Doe" src={User1} />
              </ListItemAvatar>
              <ListItemText primary={notification.studentsDetails.user_name} />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {notification.timeAgo}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">{notification.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  {notification.isRead === false && (
                    <Grid item>
                      <Chip label="Unread" sx={chipErrorSX} />
                    </Grid>
                  )}
                  {notification.createdAt.includes(new Date().toISOString().slice(0, 10)) && (
                    <Grid item>
                      <Chip label="New" sx={chipWarningSX} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default NotificationList;
