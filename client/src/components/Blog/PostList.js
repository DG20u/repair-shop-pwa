import React from 'react';
import { Box, Typography } from '@mui/material';
import PostCard from './PostCard';

const PostList = ({ posts }) => {
  if (!posts.length) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No hay publicaciones aún
      </Typography>
    );
  }

  return (
    <Box>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default PostList;