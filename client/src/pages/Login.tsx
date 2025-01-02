import React, { useState, FormEvent, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';


const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(loginInput: { email: $email, password: $password }) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {

      if (data.loginUser.token) {
        localStorage.setItem('token', data.loginUser.token);
        localStorage.setItem('userId', data.loginUser.user.id);
        localStorage.setItem('userName', data.loginUser.user.name);


        // console.log('Logged in user:', data.loginUser.user);


        navigate('/dashboard');
      }
    },
    onError: (error) => {
      setError(error.message || 'Failed to login');
      setIsLoading(false);
    }
  });


  const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password: string): boolean => password.length >= 6;


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);


    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {

      await loginUser({
        variables: { email, password }
      });
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: 2,
          mt: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }} variant="body2">
            {error}
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
            
              id="email"
              type="email"
              name='email'
              placeholder='Enter the email'
              value={email}
              onChange={handleEmailChange}
              fullWidth
              variant="standard"
              error={!!error && !isValidEmail(email)}
              helperText={error && !isValidEmail(email) ? "Please enter a valid email address" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              placeholder='Enter the password'
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              variant="standard"
              error={!!error && !isValidPassword(password)}
              helperText={error && !isValidPassword(password) ? "Password must be at least 6 characters long" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disableElevation
              disableRipple
              disabled={isLoading}
              sx={{
                mt: 2,
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                '&:active': {
                  backgroundColor: '#1565c0',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
