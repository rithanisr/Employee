import Data from '../models/Data'
import { AuthenticationError } from 'apollo-server-express';

const dataresolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAll: async (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view data');
      }
      return await Data.find({ userId: context.user.id });
    },
    getData: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view data');
      }
      const data = await Data.findOne({ _id: id, userId: context.user.id });
      if (!data) {
        throw new Error('Data not found or you do not have permission to view it');
      }
      return data;
    },
  },
  Mutation: {
    createData: async (
      _: any,
      args: { data: { name: string; email: string; mobileno: string; desgination: string } },
      context: any
    ) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create data');
      }
      const { name, email, mobileno, desgination } = args.data;

      const newData = new Data({
        name,
        email,
        mobileno,
        desgination,
        userId: context.user.id
      });

      try {
        const savedData = await newData.save();
        return savedData;
      } catch (error) {
        throw new Error("Failed to create data");
      }
    },
    updateData: async (
      _: any,
      { id, data }: { id: string; data: { name: string; email: string; mobileno: string; desgination: string } },
      context: any
    ) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update data');
      }
      const updatedData = await Data.findOneAndUpdate(
        { _id: id, userId: context.user.id },
        data,
        { new: true }
      );
      if (!updatedData) {
        throw new Error(`Data with ID ${id} not found or you do not have permission to update it`);
      }
      return updatedData;
    },
    deleteData: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to delete data');
      }
      const deletedData = await Data.findOneAndDelete({ _id: id, userId: context.user.id });

      if (!deletedData) {
        throw new Error(`Data with ID ${id} not found or you do not have permission to delete it`);
      }

      return {
        success: true,
        message: `Data with ID ${id} deleted successfully`,
      };
    }
  }
}

export default dataresolvers;

