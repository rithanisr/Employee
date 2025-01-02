import React, { useState, FormEvent, ChangeEvent } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    registerUser(registerInput: $registerInput) {
      message
      token
       user {
        id
        name
        email
      }
    }
  }
`;
function Register() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [register, { data, loading }] = useMutation(REGISTER_MUTATION);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await register({
        variables: { registerInput: { name, email, password } },
      });

      const registerResponse = response.data?.registerUser;

      if (!registerResponse) {
        throw new Error('Registration failed: No data received');
      }

      localStorage.setItem('token', registerResponse.token);
      console.log(registerResponse);
      navigate('/');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Account created successfully')
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.graphQLErrors) {
        setError(err.graphQLErrors[0]?.message || 'A GraphQL error occurred');
      } else if (err.networkError) {
        setError('A network error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: isMobile ? '1rem' : '2rem',
          boxShadow: 2,
          mt: isMobile ? 2 : 4,
        }}
      >
        <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2 }}>Register</Typography>
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              placeholder="Enter your Name"
              required
              value={name}
              type="text"
              name="name"
              fullWidth
              variant="standard"
              onChange={handleNameChange}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter your email"
              required
              id="email"
              type="email"
              value={email}
              name="email"
              fullWidth
              variant="standard"
              onChange={handleEmailChange}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter your password"
              required
              id="password"
              type="password"
              value={password}
              name="password"
              variant="standard"
              fullWidth
              onChange={handlePasswordChange}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              fullWidth
              variant="standard"
              onChange={handleConfirmPasswordChange}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disableElevation
              disableRipple
              sx={{
                mt: 2,
                py: isMobile ? 1 : 1.5,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Register;

