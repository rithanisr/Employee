import gql from 'graphql-tag';

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    getData(id: $id) {
      id
      name
      email
      mobileno
      desgination
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $data: DataInput!) {
    updateData(id: $id, data: $data) {
      id
      name
      email
      mobileno
      desgination
    }
  }
`;

export const GET_USER_EMPLOYEES = gql`
  query GetUserEmployees {
    getAll {
      id
      name
      email
      mobileno
      desgination
    }
  }
`;

