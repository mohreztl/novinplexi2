import connect from "@/utils/config/dbConnection";
import User from "@/utils/models/User.js";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signJwtToken } from "@/lib/jwt";
import Verify from "@/utils/models/Verify"
const DEFAULT_PROFILE_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

// async function createUser(phoneNumber, name) {

//   const newUser = new User({
  
//  phoneNumber,
//     name,
//     profileImage: DEFAULT_PROFILE_IMAGE,
//   });
//   return await newUser.save();
// }

export const  authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text", placeholder: "09123456789" },
        code: { label: "Verification Code", type: "text" },
        isRegistering: { label: "Is Registering", type: "hidden" },
      },
      async authorize(credentials) {
        const { phoneNumber, code, isRegistering } = credentials;
        try {
          await connect();
          let user = await User.findOne({ phoneNumber });

          if (isRegistering) {
            if (user) throw new Error("کاربر قبلاً ثبت‌نام کرده است");
            
            const verification = await Verify.findOne({
              phoneNumber,
              code: parseInt(code, 10),
              expiresAt: { $gte: new Date() },
            });

            if (!verification) throw new Error("کد تأیید نامعتبر یا منقضی شده است");
            await Verify.deleteOne({ _id: verification._id });

            user = new User({ phoneNumber, name: "New User", createdAt: new Date() ,   profileImage: DEFAULT_PROFILE_IMAGE,});
            await user.save();
          }
          const {...currentUser } = user._doc;
          const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });
 
          return {
            ...currentUser,
            accessToken,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber;
        token.notificationPreferences = user.notificationPreferences;
        token.admin = user.admin;
      }
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.phoneNumber = session.user.phoneNumber;
        token.profileImage = session.user.profileImage || DEFAULT_PROFILE_IMAGE;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user._id = token._id;
        session.user.phoneNumber = token.phoneNumber;
        session.user.name = token.name;
        session.user.notificationPreferences = token.notificationPreferences;
        session.user.admin = token.admin;
        session.user.profileImage = token.profileImage;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/" },}