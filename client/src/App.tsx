import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Register from './pages/Register';
import Data from './components/Data';
import Createemployee from './pages/Createemployee';
import Login from './pages/Login';
import Update from './pages/Update';
import { gql, useQuery } from "@apollo/client";

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

const App: React.FC = () => {
    const { data, loading, error } = useQuery(HELLO_QUERY);

  return (
    <Container 
      className="App" 
      maxWidth="lg" 
      sx={{
        marginTop: 5,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
      }}
    >
       {loading && <p>Connecting to backend...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p style={{ color: 'green' }}>Backend says: {data.hello}</p>}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Data />} />
          <Route path='/createemployee' element={<Createemployee />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

