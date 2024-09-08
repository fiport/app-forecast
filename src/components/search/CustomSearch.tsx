import {Card, Grid2, TextField} from "@mui/material";
import React from "react";

export default function CustomSearch() {
  return (
      <Grid2 mb={5} mt={5}>
        <Card variant="outlined" style={{padding: 20}}>
          <TextField
              label="Digite para buscar..."
              variant="standard"
              fullWidth
          />
        </Card>
      </Grid2>
  );
}