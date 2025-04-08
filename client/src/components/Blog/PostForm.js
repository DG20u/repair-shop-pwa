import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography,
  Snackbar,
  Alert 
} from '@mui/material';
import { createPost } from '../../utils/api';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newPost = await createPost({ content });
      setContent('');
      setAlert({
        open: true,
        message: 'Publicación creada exitosamente',
        severity: 'success'
      });
      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Error al crear la publicación',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Nueva Publicación
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué quieres compartir?"
          variant="outlined"
          margin="normal"
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={isLoading}
          sx={{ mt: 1 }}
        >
          {isLoading ? 'Publicando...' : 'Publicar'}
        </Button>
      </Box>
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PostForm;