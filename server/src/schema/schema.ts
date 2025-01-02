import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    password: String
    token: String
  }
 input RegisterInput {
    name: String
    email: String
    password: String
  }
type RegisterResponse
  {
  message: String
  token: String
  user: User
}
   input LoginInput {
    email: String
    password: String
  }
 type LoginResponse {
  message: String
  token: String
  user: User
}
type Query {
    hello: String
    getUser(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput):  RegisterResponse
    loginUser(loginInput:LoginInput):LoginResponse
   
  }
`;
export default typeDefs;