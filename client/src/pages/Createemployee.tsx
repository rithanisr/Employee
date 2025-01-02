import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';


const ADD_EMPLOYEE = gql`
  mutation AddEmployee($data: DataInput!) {
    createData(data: $data) {
      id
      name
      email
      mobileno
      desgination
    }
  }
`;

const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();


  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileno, setMobileno] = useState<string>('');
  const [desgination, setDesgination] = useState<string>('');
  const [error, setError] = useState<string>('');


  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {

      await addEmployee({
        variables: {
          data: {
            name,
            email,
            mobileno,
            desgination,
          },
        },
      });

      navigate('/dashboard');


      setName('');
      setEmail('');
      setMobileno('');
      setDesgination('');
    } catch (err) {
      setError('Error adding employee. Please try again.');
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
          border: '1px solid',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>Create Employee</Typography>


        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

        <TextField
          id="name"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          fullWidth
          variant="standard"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          fullWidth
          variant="standard"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="mobileno"
          placeholder="Enter Mobile Number"
          required
          value={mobileno}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMobileno(e.target.value)}
          fullWidth
          variant="standard"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="desgination"
          placeholder="Enter Designation"
          required
          value={desgination}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDesgination(e.target.value)}
          fullWidth
          variant="standard"
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={loading}
          disableElevation
          disableRipple
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
        >
          {loading ? 'Adding...' : 'Add Employee'}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateEmployee;

