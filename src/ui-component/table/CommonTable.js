import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';

const CommonTable = ({ rows, columns, isloading }) => {
  return (
    <div style={{ width: '100%' }}>
      {isloading ? (
        <CircularProgress size={24} color="inherit" />
      ) : rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}
          pageSizeOptions={[10, 15, 20]}
        />
      ) : (
        <Box sx={{ width: '100%', typography: 'subtitle1', textAlign: 'center' }}>No Data found</Box>
      )}
    </div>
  );
};
export default CommonTable;