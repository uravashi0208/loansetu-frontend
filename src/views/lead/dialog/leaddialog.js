import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tooltip, Typography } from '@mui/material';

// Importing icons from @tabler/icons-react
import { IconEdit, IconSend, IconTrendingUp, IconUserPlus, IconTrash, IconStatusChange } from '@tabler/icons-react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/system';
import LeadDetails from '../leaddetails/leadDetails';
import LeadHistory from '../leaddetails/leadHistory';
import AddLeadFollowUp from './addLeadFollowup';
import LeadFollowUp from '../leaddetails/leadFolloUp';
import AssignLead from './leadAssignDialog';
import ChangeLeadStatus from './changeStatusDialog';
import LeadUpdate from './leadEditDialog';

const LeadDialog = ({ open, handleClose, selectedLead }) => {
  const [value, setValue] = useState('1');
  const [leadupdateOpenDialog, setLeadupdateOpenDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [leadAssignToOpenDialog, setLeadAssignToOpenDialog] = useState(false);
  const [changeStatusOpenDialog, setChangeStatusOpenDialog] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLeadupdateOpenDialog = () => {
    setLeadupdateOpenDialog(true);
  };

  const handleLeadupdateCloseDialog = () => {
    setLeadupdateOpenDialog(false);
  };

  const handleLeadAssignToOpenDialog = () => {
    setLeadAssignToOpenDialog(true);
  };

  const handleLeadAssignToCloseDialog = () => {
    setLeadAssignToOpenDialog(false);
  };

  const handleChangeStatusOpenDialog = () => {
    setChangeStatusOpenDialog(true);
  };

  const handleChangeStatusCloseDialog = () => {
    setChangeStatusOpenDialog(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" classes={{ paper: 'dialogNoRadius' }}>
        <DialogTitle sx={{ backgroundColor: '#070d59' }}>
          <Typography variant="h4" color="#ffffff">
            Lead Detail
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 13,
            borderRadius: '2px',
            color: '#070d59',
            backgroundColor: '#ffffff',
            transition: 'transform 0.3s ease',
            padding: '0px',
            '&:hover': {
              animation: 'shake 0.5s',
              backgroundColor: '#ffffff'
            },
            '@keyframes shake': {
              '0%': {
                transform: 'translateX(0)'
              },
              '25%': {
                transform: 'translateX(5px)'
              },
              '50%': {
                transform: 'translateX(-5px)'
              },
              '75%': {
                transform: 'translateX(5px)'
              },
              '100%': {
                transform: 'translateX(0)'
              }
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ borderBottom: 0, borderColor: 'divider', display: 'flex', justifyContent: 'center', color: '#7b7878e6' }}>
            <Tooltip title="Edit Lead">
              <IconEdit style={{ cursor: 'pointer' }} onClick={() => handleLeadupdateOpenDialog(selectedLead._id)} />
            </Tooltip>
            <Tooltip title="Lead Followup">
              <IconSend style={{ marginLeft: '40px', cursor: 'pointer' }} onClick={() => handleOpenDialog(selectedLead._id)} />
            </Tooltip>
            <Tooltip title="Lead Assign To">
              <IconTrendingUp
                style={{ marginLeft: '40px', cursor: 'pointer' }}
                onClick={() => handleLeadAssignToOpenDialog(selectedLead._id)}
              />
            </Tooltip>
            <Tooltip title="Convert To Customer">
              <IconUserPlus style={{ marginLeft: '40px', cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title="Delete Lead">
              <IconTrash style={{ marginLeft: '40px', cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title="Change Status">
              <IconStatusChange
                style={{ marginLeft: '40px', cursor: 'pointer' }}
                onClick={() => handleChangeStatusOpenDialog(selectedLead._id)}
              />
            </Tooltip>
          </Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Lead Details" value="1" />
                <Tab label="Lead FollowUp" value="2" />
                <Tab label="Lead history" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <LeadDetails selectedLead={selectedLead} />
            </TabPanel>
            <TabPanel value="2">
              <LeadFollowUp selectedLead={selectedLead} />
            </TabPanel>
            <TabPanel value="3">
              <LeadHistory selectedLead={selectedLead} />
            </TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>
      <LeadUpdate open={leadupdateOpenDialog} handleClose={handleLeadupdateCloseDialog} selectedLead={selectedLead} />
      <AddLeadFollowUp open={openDialog} handleClose={handleCloseDialog} selectedLead={selectedLead} />
      <AssignLead open={leadAssignToOpenDialog} handleClose={handleLeadAssignToCloseDialog} selectedLead={selectedLead} />
      <ChangeLeadStatus open={changeStatusOpenDialog} handleClose={handleChangeStatusCloseDialog} selectedLead={selectedLead} />
    </>
  );
};

export default LeadDialog;
