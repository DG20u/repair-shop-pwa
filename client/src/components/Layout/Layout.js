import React from 'react';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;