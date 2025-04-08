import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { login as loginApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await loginApi(loginData);
      login(response.token, response.user);
      setOpenLogin(false);
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Repair Shop
          </Typography>
          <Box>
            <Button color="inherit" component={RouterLink} to="/">
              Inicio
            </Button>
            <Button color="inherit" component={RouterLink} to="/services">
              Servicios
            </Button>
            <Button color="inherit" component={RouterLink} to="/blog">
              Blog
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              Contacto
            </Button>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => setOpenLogin(true)}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <DialogTitle>Iniciar Sesión</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Usuario"
            fullWidth
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogin(false)}>Cancelar</Button>
          <Button onClick={handleLogin}>Iniciar Sesión</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;