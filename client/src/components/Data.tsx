import React, { useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Dashboard from '../pages/Dashboard';


const GET_USER = gql`
   query GetUser($id: ID!) {
    getUser(id: $id) {
      name
      email
    }
  }
`;

const Data: React.FC = () => {
  const navigate = useNavigate();
  //   const response = await loginUser(credentials);

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  // console.log('userId from localStorage:', userId)


  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId, // Skip the query if userId is not available
  });
  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };


  return (
    <div style={{ width: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 3,
          color: 'text.primary',
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'cursive',
          fontSize: '50px',
        }}
      >
        Welcome, {userName || (data && data.getUser ? data.getUser.name : 'User')}!
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={5}
        sx={{ display: 'flex', justifyContent: 'end', marginBottom: 3 }}
      >
        <Link to="/createemployee">
          <Button variant="outlined" disableElevation disableRipple startIcon={<AddTaskIcon />}>
            Add Employee
          </Button>
        </Link>
        <Button
          variant="outlined"
          disableElevation
          disableRipple
          startIcon={<LogoutIcon />}
          sx={{ marginLeft: { sm: 10 } }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>


      {loading && <h4>Loading...</h4>}
      {error && <h4 style={{ color: 'red' }}>Error: {error.message}</h4>}

      <div>

        <Dashboard />
      </div>



    </div>
  );
};

export default Data;
