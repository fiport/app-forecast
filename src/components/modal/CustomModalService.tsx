import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useModal } from '../../contexts/modal/ModalContext';
import {Button, Card} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const CustomModalService: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { closeModal } = useModal();

  return (
      <Modal
          open={true}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>

      </Modal>
  );
};

export default CustomModalService;
