import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, Users, ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const recentOrders = [
  { id: '1234', customer: 'John Doe', product: 'Wireless Earbuds', total: '$129.99', status: 'Delivered' },
  { id: '1235', customer: 'Jane Smith', product: 'Smart Watch', total: '$199.99', status: 'Processing' },
  { id: '1236', customer: 'Bob Johnson', product: 'Bluetooth Speaker', total: '$79.99', status: 'Shipped' },
  { id: '1237', customer: 'Alice Brown', product: 'Phone Case', total: '$24.99', status: 'Delivered' },
]

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <Icon className="h-4 w-4 text-gray-400" />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-xs text-gray-500">
      {trend === 'up' ? (
        <ArrowUpRight className="inline h-4 w-4 text-green-500" />
      ) : (
        <ArrowDownRight className="inline h-4 w-4 text-red-500" />
      )}
      {trendValue} from last month
    </p>
  </div>
)

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend="up" trendValue="20.1%" />
        <StatCard title="New Customers" value="2,350" icon={Users} trend="up" trendValue="18.2%" />
        <StatCard title="Total Orders" value="1,789" icon={ShoppingBag} trend="down" trendValue="3.1%" />
        <StatCard title="Conversion Rate" value="3.24%" icon={TrendingUp} trend="up" trendValue="0.2%" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          View All Analytics
        </button>
      </div>
    </div>
  )
}