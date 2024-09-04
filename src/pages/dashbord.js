import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  { id: '1234', customer: 'John Doe', product: 'Wireless Earbuds', total: '129.99 Birr', status: 'Delivered' },
  { id: '1235', customer: 'Jane Smith', product: 'Smart Watch', total: '199.99 Birr', status: 'Processing' },
  { id: '1236', customer: 'Bob Johnson', product: 'Bluetooth Speaker', total: '79.99 Birr', status: 'Shipped' },
  { id: '1237', customer: 'Alice Brown', product: 'Phone Case', total: '24.99 Birr', status: 'Delivered' },
]

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {trend === 'up' ? (
          <ArrowUpRight className="inline h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="inline h-4 w-4 text-red-500" />
        )}
        {trendValue} from last month
      </p>
    </CardContent>
  </Card>
)

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend="up" trendValue="20.1%" />
        <StatCard title="New Customers" value="2,350" icon={Users} trend="up" trendValue="18.2%" />
        <StatCard title="Total Orders" value="1,789" icon={ShoppingBag} trend="down" trendValue="3.1%" />
        <StatCard title="Conversion Rate" value="3.24%" icon={TrendingUp} trend="up" trendValue="0.2%" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button>View All Analytics</Button>
      </div>
    </div>
  )
}