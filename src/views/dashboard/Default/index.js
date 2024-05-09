import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import TotalAllLead from './AllLead';
import TotalNewLead from './TotalNewLead';
import TotalProccessingLead from './TotalProcessingLead';
import TotalCancelLead from './TotalCancelLead';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TotalAllLead isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TotalNewLead isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TotalProccessingLead isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TotalCancelLead isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          {userData.data.role === 'Admin' && (
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
