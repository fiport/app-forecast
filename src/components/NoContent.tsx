import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import NoDataImage from '../assets/images/no-data.jpg'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

const Image = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 300,
  width: 300,
  marginBottom: theme.spacing(2),
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  marginBottom: theme.spacing(2),
}));

interface NoContentProps {
  onClick: () => void;
}

const NoContent: React.FC<NoContentProps> = ({onClick}) => {
  return (
      <Container>
        <Image srcSet={NoDataImage} alt="No Content" />
        <Message variant="h6">Não há nada a exibir por aqui...</Message>
      </Container>
  );
};

export default NoContent;
