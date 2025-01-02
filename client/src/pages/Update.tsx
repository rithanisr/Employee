import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEE, UPDATE_EMPLOYEE, GET_USER_EMPLOYEES } from '../components/Updateql';

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  mobileno: string;
  desgination: string;
}

const Update: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileno, setMobileno] = useState<string>('');
  const [desgination, setDesgination] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { data: userData, loading: userLoading } = useQuery(GET_USER_EMPLOYEES);
  const { data, loading, error: fetchError } = useQuery(GET_EMPLOYEE, {
    variables: { id },
    skip: userLoading, // Skip this query until we have user data
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_USER_EMPLOYEES }],
  });

  useEffect(() => {
    if (userData && !userLoading) {
      const userHasAccess = userData.getAll.some((employee: EmployeeData) => employee.id === id);
      if (!userHasAccess) {
        setError("You don't have permission to edit this employee.");
        return;
      }
    }

    if (data) {
      setName(data.getData.name);
      setEmail(data.getData.email);
      setMobileno(data.getData.mobileno);
      setDesgination(data.getData.desgination);
    }
  }, [data, userData, userLoading, id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await updateEmployee({
        variables: {
          id,
          data: { name, email, mobileno, desgination },
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to update employee data.');
    }
  };

  if (loading || userLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error loading employee data.</div>;

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Edit Employee
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

        <TextField
          id="name"
          placeholder="Enter your Name"
          required
          value={name}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          id="email"
          placeholder="Enter your Email"
          required
          value={email}
          type="email"
          fullWidth
          variant="standard"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          id="mobileno"
          placeholder="Enter your Mobile No"
          required
          value={mobileno}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMobileno(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          id="desgination"
          placeholder="Enter Designation"
          required
          value={desgination}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDesgination(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disableElevation
          disableRipple
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#115293',
            },
            '&:active': {
              backgroundColor: '#0d3c78',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default Update;

