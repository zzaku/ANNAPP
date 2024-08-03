import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';

const Loading: React.FC = () => (
    <Container style={{ textAlign: 'center', marginTop: 50 }}>
        <Typography variant="h6" gutterBottom>Chargement...</Typography>
        <CircularProgress />
    </Container>
);

export default Loading;
