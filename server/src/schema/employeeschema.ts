import gql from 'graphql-tag';


const employeetypeDefs = gql`

type Data{
id:ID
name:String
email:String
mobileno:String
desgination:String
}

type Query{
hello:String
getAll:[Data]
getData(id: ID!): Data
}

input DataInput{
name:String
email:String
mobileno:String
desgination:String
}

type Mutation{
createData(data:DataInput):Data
updateData(id:ID!,data:DataInput!):Data
deleteData(id: ID!): DeleteDataResponse!
}
 type DeleteDataResponse {
    success: Boolean!
    message: String
}`;

export default employeetypeDefs;
