import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CustomDialogProps {
  title?: string,
  message?: string,
  confirmText?: string,
  cancelText?: string,
  onConfirm?: () => void;
  onCancel?: () => void;
}

const CustomDialogConfirmService: React.FC<CustomDialogProps> = ({title, message, confirmText, cancelText}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{cancelText}</Button>
            <Button onClick={handleClose} autoFocus>
              {confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}

export default CustomDialogConfirmService;