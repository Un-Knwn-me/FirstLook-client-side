import { Snackbar } from '@mui/material';
import React from 'react'
// import { forwardRef } from 'react';
import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';

// const Alert = forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

const Alertbar = ({ severity, children, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
  return (
    <>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {children}
      </MuiAlert>
    </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}

    </>
  )
}


export default Alertbar