import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {ThemeProvider} from "@mui/material";
import theme from "./Theme";
import {ModalProvider} from "./contexts/modal/ModalContext";
import {DialogProvider} from "./contexts/dialog/DialogContext";
import CustomAppBar from "./components/CustomAppBar";

export default function App() {
  return (
      <Router>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <DialogProvider>
              <CustomAppBar />
            </DialogProvider>
          </ModalProvider>
        </ThemeProvider>
      </Router>
  );
};
