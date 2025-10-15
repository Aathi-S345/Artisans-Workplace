// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 🧠 Replace with your database or API logic

        const adminEmail = "admin@example.com";
        const customerEmail = "customer@example.com";

        if (credentials?.email === adminEmail) {
          return { 
            id: "1", 
            name: "Admin User", 
            email: adminEmail, 
            role: "admin" 
          };
        }

        if (credentials?.email === customerEmail) {
          return { 
            id: "2", 
            name: "Customer User", 
            email: customerEmail, 
            role: "customer" 
          };
        }

        return null;
      }
    })
  ],
  // Optionally add callbacks, session, pages, etc.
};

const handler = NextAuth(authOptions);

// ✅ Correct Next.js 13+ App Router export
export { handler as GET, handler as POST };
