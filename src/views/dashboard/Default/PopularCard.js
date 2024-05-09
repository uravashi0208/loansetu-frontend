import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import GetRequest from 'commonRequest/getRequest';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  const [allLeadCount, setAllLeadCount] = useState([]);

  useEffect(() => {
    if (userData.data.role === 'Admin') {
      getAllReferenceLead();
    }
  }, []);

  const getAllReferenceLead = async () => {
    const response = await GetRequest('/dashboardreport/getReferenceLeadCount');
    if (response.response === true) {
      setAllLeadCount(response.leadCounts);
    }
  };

  console.log('allLeadCount :', allLeadCount);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Reference Lead</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {allLeadCount.length > 0 ? (
                  allLeadCount.map((leadcount) => (
                    <>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {leadcount.company_name}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1" color="inherit">
                                    {leadcount.leadCount}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                    </>
                  ))
                ) : (
                  <Grid container direction="column">
                    <Grid item>No Record Found</Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
