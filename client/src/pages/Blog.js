import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  TextField,
  CircularProgress,
  Paper
} from '@mui/material';
import PostForm from '../components/Blog/PostForm';
import PostList from '../components/Blog/PostList';
import { getPosts } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Error al cargar las publicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Blog
      </Typography>
      
      {isAuthenticated ? (
        <PostForm onPostCreated={handlePostCreated} />
      ) : (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.100' }}>
          <Typography align="center" color="text.secondary">
            Inicia sesión para crear una publicación
          </Typography>
        </Paper>
      )}

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar publicaciones..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </Container>
  );
};

export default Blog;