import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_EMPLOYEE } from '../components/graphql';
import { useMutation, useQuery, gql } from '@apollo/client';

const GET_EMPLOYEES = gql`
  query {
    getAll {
      id
      name
      email
      mobileno
      desgination
    }
  }
`;

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  mobileno: string;
  desgination: string;
}

interface GetEmployeesResponse {
  getAll: EmployeeData[];
}

const Dashboard = () => {
  const { data, loading, error, refetch } = useQuery<GetEmployeesResponse>(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteEmployee({ variables: { id } });

      if (data?.deleteData?.success) {
        alert(data.deleteData.message);
      } else {
        alert('Failed to delete the employee.');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Employee ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Mobile No</TableCell>
            <TableCell align="center">Designation</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.getAll?.map((employee: EmployeeData, index: number) => (
            <TableRow key={employee.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{employee.name}</TableCell>
              <TableCell align="center">{employee.email}</TableCell>
              <TableCell align="center">{employee.mobileno}</TableCell>
              <TableCell align="center">{employee.desgination}</TableCell>
              <TableCell align="center">
                <Link to={`/update/${employee.id}`}>
                  <Button
                    variant="outlined"
                    disableElevation
                    disableRipple
                    startIcon={<EditNoteIcon />}
                    sx={{ margin: 2 }}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  disableElevation
                  disableRipple
                  onClick={() => handleDelete(employee.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;
