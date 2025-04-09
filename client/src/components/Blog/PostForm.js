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
import { savePostOffline } from '../../utils/indexedDB';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {  
      if (!navigator.onLine) {  
        // Guardar post offline  
        await savePostOffline({ content });  
        setAlert({  
          open: true,  
          message: 'Post guardado offline. Se publicará cuando haya conexión.',  
          severity: 'info'  
        });  
      } else {  
        // Publicar normalmente  
        const newPost = await createPost({ content });  
        onPostCreated(newPost);  
        setAlert({  
          open: true,  
          message: 'Post publicado exitosamente',  
          severity: 'success'  
        });  
      }  
      setContent('');  
    } catch (error) {  
      setAlert({  
        open: true,  
        message: 'Error al crear el post',  
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