import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDb from "@/lib/db/db";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials.email;
          const password = credentials.password;
          if (!email || !password) {
            throw new Error("Please enter email and password");
          }
          await connectDb();

          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("No user found with this email");
          }
          const isVerified = await user.isVerified;
          if (!isVerified) {
            throw new Error("Please verify your email first");
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            throw new Error("Invalid password");
          }
          if (user) return user;
          else {
            return null;
          }
        } catch (error) {
          throw new Error("Error in credentials authorize");
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      

      if (account.provider === "github" || account.provider === "google") {
        try {
          const { email, name } = user;
          await connectDb();
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            const newUser = new User({
              email,
              name,
              isVerified: true,
            });
            await newUser.save();
           
          } else {
          
          }
          return true; // Ensure you return true here
        } catch (error) {
          
          throw new Error("Error in creating user from auth callback social");
        }
      }

      if (account.provider === "credentials") {
        return true;
      }

      return false; // Ensure you return false for other cases
    },
    jwt: async ({ token, user }) => {
 
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.isVerified = user.isVerified;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user._id = token._id;
        session.user.id = token.sub;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  // session: {
  //   jwt: true,
  // },
});
