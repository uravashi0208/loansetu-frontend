import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';

const CommonTable = ({ rows, columns, isloading }) => {
  return (
    <>
      {isloading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center' // Center vertically
          }}
        >
          <CircularProgress size={24} color="inherit" />
        </div>
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
          // slots={{ toolbar: GridToolbar }}
        />
      ) : (
        <Box sx={{ width: '100%', typography: 'subtitle1', textAlign: 'center' }}>No Data found</Box>
      )}
    </>
  );
};
export default CommonTable;