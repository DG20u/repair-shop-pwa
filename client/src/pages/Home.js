import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenidos a Repair Shop
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Reparación de Computadoras
            </Typography>
            <Typography>
              Expertos en reparación y mantenimiento de computadoras de escritorio y laptops.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Servicio Técnico de Celulares
            </Typography>
            <Typography>
              Reparación profesional de smartphones y tablets de todas las marcas.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;