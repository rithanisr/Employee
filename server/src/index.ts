import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import { createContext } from './middleware/graphqlContext';
import allResolvers from './resolver/index.resolver';
import allTypeDefs from './schema/index.schema';
import connectDB from './database';

dotenv.config();
const Port = process.env.PORT || 4000;

const startServer = async () => {
  const app = express();
  // app.use(cors());
  app.use(express.json());
  app.use(cors({
    origin: 'https://employee-1-0ds0.onrender.com',
    credentials: true, 
  }));
// app.use(authMiddleware);
const apolloServer = new ApolloServer({
    typeDefs:allTypeDefs,
    resolvers:allResolvers,
    context: createContext,
     introspection: true,
  });

  await connectDB();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(Port, () => console.log(`Server is running on port ${Port}`));
};

startServer().catch(error => console.error('Failed to start server:', error));