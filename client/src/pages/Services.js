import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const Services = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Nuestros Servicios
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Reparación de Computadoras
              </Typography>
              <Typography variant="body2">
                • Diagnóstico completo
                • Reparación de hardware
                • Actualización de componentes
                • Limpieza y mantenimiento
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Servicio de Celulares
              </Typography>
              <Typography variant="body2">
                • Reparación de pantallas
                • Cambio de baterías
                • Recuperación de datos
                • Actualización de software
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Consolas de Videojuegos
              </Typography>
              <Typography variant="body2">
                • Reparación de consolas
                • Mantenimiento preventivo
                • Actualización de firmware
                • Limpieza profesional
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Services;