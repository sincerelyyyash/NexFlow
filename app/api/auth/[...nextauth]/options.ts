
import { NextAuthOptions, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/schemas/userSchema";

interface CustomUser extends DefaultUser {
  _id: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", placeholder: "John Doe" }, // for signup
        isSignup: { label: "SignUp", type: "boolean" }, // to differentiate between signup and login
      },
      async authorize(credentials: any) {
        await dbConnect();

        const { email, password, name, isSignup } = credentials;

        try {
          if (isSignup) {
            // Check if user already exists for sign-up
            const existingUser = await UserModel.findOne({ email }).exec();
            if (existingUser) {
              throw new Error("User already exists with this email.");
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await UserModel.create({
              email,
              password: hashedPassword,
              name,
            });

            return {
              _id: newUser._id.toString(),
              email: newUser.email,
              name: newUser.name,
              image: newUser.image,
            } as CustomUser;
          } else {
            // Sign in logic
            const user = await UserModel.findOne({ email }).exec();

            if (!user) {
              throw new Error("No user found with this email.");
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (isPasswordCorrect) {
              return {
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                image: user.image,
              } as CustomUser;
            } else {
              throw new Error("Incorrect password.");
            }
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

