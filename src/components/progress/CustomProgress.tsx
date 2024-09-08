import { CircularProgress } from '@mui/material';
import React from 'react';

interface CustomProgressLoadingProps {
  size: number;
}

const CustomProgressLoading: React.FC<CustomProgressLoadingProps> = ({ size }) => {
  return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}>
        <CircularProgress color={'primary'} size={size} />
      </div>
  );
};

export default CustomProgressLoading;
