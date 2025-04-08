import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext'
import theme from './styles/theme';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Components
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {  
  return (  
    <AuthProvider>  
      <ThemeProvider theme={theme}>  
        <CssBaseline />  
        <Router>  
          <Layout>  
            <Routes>  
              <Route path="/" element={<Home />} />  
              <Route path="/services" element={<Services />} />  
              <Route path="/blog" element={<Blog />} />  
              <Route path="/contact" element={<Contact />} />  
              <Route   
                path="/admin"   
                element={  
                  <PrivateRoute>  
                    <Admin />  
                  </PrivateRoute>  
                }   
              />  
            </Routes>  
          </Layout>  
        </Router>  
      </ThemeProvider>  
    </AuthProvider>  
  );  
}  
  
export default App;