import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box 
} from '@mui/material';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            Por: {post.author?.username || 'Usuario'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(post.createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;