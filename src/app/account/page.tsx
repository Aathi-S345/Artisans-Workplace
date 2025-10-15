// In src/app/account/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  // If the user is not logged in, redirect them to the login page
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-600">Full Name:</span>
              <span className="ml-2">{session.user?.name || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email:</span>
              <span className="ml-2">{session.user?.email || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Role:</span>
              <span className="ml-2 capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {session.user?.role || 'Customer'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Account Management</h2>
          <div className="flex flex-col sm:flex-row gap-4">
             {/* You can build these pages next */}
            <a href="/account/orders" className="text-blue-600 hover:underline">View Order History</a>
            <a href="/account/settings" className="text-blue-600 hover:underline">Edit Profile & Password</a>
            <a href="/account/addresses" className="text-blue-600 hover:underline">Manage Addresses</a>
          </div>
        </div>
      </div>
    </div>
  );
}