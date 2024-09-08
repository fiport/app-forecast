import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomDialogConfirmService from '../../components/dialog/CustomDialogConfirmService';

interface DialogParams {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DialogContextType {
  openDialog: (params: DialogParams) => void;
  closeDialog: () => void;
  dialogParams: DialogParams | null;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogParams, setDialogParams] = useState<DialogParams | null>(null);

  const openDialog = (params: DialogParams) => setDialogParams(params);
  const closeDialog = () => setDialogParams(null);

  return (
      <DialogContext.Provider value={{ openDialog, closeDialog, dialogParams }}>
        {children}
        {dialogParams && (
            <CustomDialogConfirmService
                title={dialogParams.title}
                message={dialogParams.message}
                confirmText={dialogParams.confirmText}
                cancelText={dialogParams.cancelText}
                onConfirm={dialogParams.onConfirm}
                onCancel={dialogParams.onCancel}
            />
        )}
      </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
