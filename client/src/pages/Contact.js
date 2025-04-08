import React from 'react';
import { Typography, Box, TextField, Button, Grid } from '@mui/material';

const Contact = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contacto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form>
            <TextField
              fullWidth
              label="Nombre"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Mensaje"
              multiline
              rows={4}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Enviar Mensaje
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Información de Contacto
          </Typography>
          <Typography>
            Dirección: Calle Principal #123
          </Typography>
          <Typography>
            Teléfono: (123) 456-7890
          </Typography>
          <Typography>
            Email: contacto@repairshop.com
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;