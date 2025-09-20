'use client'

import { useState } from 'react'

// Mock data
const dashboardData = {
  stats: {
    totalSales: 12450,
    totalOrders: 89,
    averageRating: 4.7,
    products: 15
  },
  recentOrders: [
    { id: '1001', customer: 'John Doe', amount: 89.98, status: 'Delivered', date: '2023-05-15' },
    { id: '1002', customer: 'Jane Smith', amount: 45.99, status: 'Processing', date: '2023-05-14' },
    { id: '1003', customer: 'Bob Johnson', amount: 120.50, status: 'Shipped', date: '2023-05-13' }
  ],
  recentReviews: [
    { product: 'Ceramic Mug', rating: 5, comment: 'Beautiful craftsmanship!', customer: 'Sarah W.' },
    { product: 'Wooden Bowl', rating: 4, comment: 'Lovely piece, arrived safely.', customer: 'Mike T.' }
  ]
}

export default function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">VishwaKarma Dashboard</h1>
      
      {/* Navigation tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {['overview', 'products', 'orders', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 font-medium ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div>
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <h3 className="text-2xl font-bold text-blue-600">${dashboardData.stats.totalSales}</h3>
              <p className="text-gray-600">Total Sales</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold text-blue-600">{dashboardData.stats.totalOrders}</h3>
              <p className="text-gray-600">Total Orders</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold text-blue-600">{dashboardData.stats.averageRating}</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold text-blue-600">{dashboardData.stats.products}</h3>
              <p className="text-gray-600">Products</p>
            </div>
          </div>

          {/* Recent orders */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Customer</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3">#{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">${order.amount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent reviews */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {dashboardData.recentReviews.map((review, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {'★'.repeat(review.rating)}
                      <span className="text-gray-400">{'★'.repeat(5 - review.rating)}</span>
                    </div>
                    <span className="font-semibold">{review.product}</span>
                  </div>
                  <p className="text-gray-700 mb-2">"{review.comment}"</p>
                  <p className="text-sm text-gray-500">- {review.customer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Products</h2>
            <button className="btn-primary">Add New Product</button>
          </div>
          <div className="card">
            <p className="text-gray-600 text-center py-8">You haven't added any products yet.</p>
          </div>
        </div>
      )}
    </div>
  )
}