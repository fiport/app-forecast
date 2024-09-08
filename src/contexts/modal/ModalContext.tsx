import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomModalService from "../../components/modal/CustomModalService";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
  };
  const closeModal = () => {
    setModalContent(null);
  };

  return (
      <ModalContext.Provider value={{ openModal, closeModal, modalContent }}>
        {children}
        {modalContent && (
            <CustomModalService>
              {modalContent}
            </CustomModalService>
        )}
      </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
