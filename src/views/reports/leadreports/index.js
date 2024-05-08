import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Chart from 'react-apexcharts';
import { useState } from 'react';

// ==============================|| TYPOGRAPHY ||============================== //

const LeadReports = () => {
  const [chartDate] = useState({
    series: [
      {
        name: 'Lead',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    options: {
      chart: {
        height: 600,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Weekly Lead Record',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    }
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6} sm={6}>
        <MainCard title="Lead Report">
          <Chart options={chartDate.options} series={chartDate.series} type="bar" />
        </MainCard>
      </Grid>
      <Grid item xs={6} sm={6}>
        <MainCard title="Reference Lead Report">
          <Chart options={chartDate.options} series={chartDate.series} type="bar" />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default LeadReports;
