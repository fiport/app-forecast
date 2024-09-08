import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Forecast from "../pages/forecast/Forecast";

export default function AppRoutes(){
  return (
      <Routes>
        <Route path="/" element={<Forecast />} />
      </Routes>
  );
};