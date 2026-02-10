import User from '../models/User';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';


const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    // getAll: async () => {
    //   return await Employee.find();
    // },
    getUser: async (_: any, { id }: { id: string }, context: any) => {
      console.log('Context in resolver:', context);
      if (!context.user) {
        throw new ApolloError('Authorization required');
      }
      // console.log('User in context:', context.user);

      const user = await User.findById(id).select("name email");
      if (!user) {
        throw new ApolloError('User not found');
      }

      return user;
    },

  },
  Mutation: {
    registerUser: async (_: any, { registerInput }: { registerInput: { name: string, email: string, password: string } }) => {

      const oldUser = await User.findOne({ email: registerInput.email });
      if (oldUser) {
        throw new ApolloError('A user with this email already exists');
      }


      const encryptedPassword = await bcrypt.hash(registerInput.password, 10);

      const newUser = new User({
        name: registerInput.name,
        email: registerInput.email.toLowerCase(),
        password: encryptedPassword,

      });


      const savedUser = await newUser.save();
      //   console.log(savedUser)



      const token = jwt.sign(
        { userId: savedUser.id, email: savedUser.email },
        "Jwt_key", { expiresIn: "2d" }
      );
      //   console.log(token)
      savedUser.token = token;
      await savedUser.save();

      return {
        message: "Account created Successfully",
        token,
        user: savedUser
      };
    },

    loginUser: async (_: any, { loginInput }: { loginInput: { email: string, password: string } }) => {
      const { email, password } = loginInput;
      const user = await User.findOne({ email: loginInput.email })
      if (!user) {
        throw new ApolloError('user not found')
      }
      const isPasswordValid = await bcrypt.compare(password, user.password.toString())
      if (!isPasswordValid) {
        throw new ApolloError('Invalid password')
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email }, "Jwt_key", { expiresIn: "2d" }
      )
      user.token = token;
      await user.save()

      return {
        message: "Login Successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
      }



    }
  }
}

export default resolvers;