import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import mongoose from "mongoose";
import User from '../../schema/user'


const connectDB = async function () {
    await mongoose.connect(process.env.URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
} 
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
                await connectDB();
                const user = await User.findOne({ email: session.user.email });
                // Set a custom id property in the session
                session.user.id = user._id.toString();
                return user
        },
        async signIn({ profile }) {
            try {
                await connectDB()
                const user = await User.findOne({ email: profile.email })
                if (!user) {
                    await User.create({
                        email: profile.email,
                        name: profile.name.toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true
            }
            catch (error) {
                console.log(error)
            }
        },
        async redirect({ url, baseUrl  }) {
            return baseUrl 
        }
    },
})
export { handler as GET, handler as POST }