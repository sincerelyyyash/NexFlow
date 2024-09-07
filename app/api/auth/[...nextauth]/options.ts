
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/schemas/userSchema';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';

// Define the Credentials interface
interface Credentials {
  email?: string;
  password?: string;
  name?: string; // For sign-up
  isSignup?: string; // Received as string from client
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' }, // Add name for sign-up
      },
      async authorize(credentials) {
        await dbConnect();


        if (credentials && typeof credentials === 'object') {
          const { email, password, name, isSignup } = credentials as Credentials;

          // Convert isSignup to boolean
          const signup = isSignup === 'true';

          if (signup) {
            // Handle sign-up
            if (!email || !password || !name) {
              throw new Error('All fields are required for sign-up');
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
              throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
              email,
              password: hashedPassword,
              name,
            });

            await newUser.save();

            return {
              id: newUser._id.toString(),
              email: newUser.email,
              name: newUser.name,
              image: newUser.image,
            };
          } else {
            // Handle sign-in
            if (!email || !password) {
              throw new Error('Email and password are required for sign-in');
            }

            const user = await User.findOne({ email });
            if (user && await bcrypt.compare(password, user.password)) {
              return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                image: user.image,
              };
            }

            throw new Error('Invalid email or password');
          }
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
};

