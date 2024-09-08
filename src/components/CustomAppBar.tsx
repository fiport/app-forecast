import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Forecast from "../pages/forecast/Forecast";

export default function CustomAppBar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
              Forecast
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{padding: 20}}>
          <Forecast/>
        </div>
      </Box>
  );
}
