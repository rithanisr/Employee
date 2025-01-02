import { gql } from '@apollo/client';

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteData(id: $id) {
      success
      message
    }
  }
`;
