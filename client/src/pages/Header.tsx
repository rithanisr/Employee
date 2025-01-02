import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import employees from '../image/employees.png';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Container maxWidth="lg">
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        align="center"
        sx={{ my: 2 }}
      >
        Employee Management System
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: isMobile ? 'auto' : '500px',
          position: "relative",
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          align="center"
          sx={{
            mb: 3,
            color: "text.primary",
            fontFamily: "cursive",
            fontSize: isMobile ? '30px' : '50px'
          }}
        >
          Welcome!
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            height: "100%",
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Grid
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: isMobile ? 2 : 0
            }}
          >
            <Box
              component="img"
              src={employees}
              alt="Welcome"
              sx={{
                width: "100%",
                maxWidth: '400px',
                height: "auto",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to='/login' style={{ textDecoration: "none", marginBottom: 10, width: '100%', maxWidth: '200px' }}>
              <Button
                variant="outlined"
                fullWidth
                disableElevation
                disableRipple
                startIcon={<LoginIcon />}
                sx={{ fontSize: isMobile ? '16px' : '18px' }}
              >
                Login
              </Button>
            </Link>
            <Link to='/register' style={{ textDecoration: "none", width: '100%', maxWidth: '200px' }}>
              <Button
                variant="outlined"
                fullWidth
                disableElevation
                disableRipple
                startIcon={<HowToRegIcon />}
                sx={{ fontSize: isMobile ? '16px' : '18px' }}
              >
                Register
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Header;

