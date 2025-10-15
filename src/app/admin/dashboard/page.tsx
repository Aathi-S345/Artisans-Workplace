// In src/app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'; // Import the UI component

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // This security check runs on the server.
  if (!session || session.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-10 border rounded-lg shadow-lg bg-white">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  // If the user is an admin, render the page layout and the client component.
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-8 bg-white border-b">
        <h1 className="text-3xl font-bold">VishwaKarma Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back to VishwaKarma, Admin {session.user.name}!</p>
      </div>
      
      {/* Render the Client Component that shows the stats */}
      <AdminDashboardClient />
    </div>
  );
}