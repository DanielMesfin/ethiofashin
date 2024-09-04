import React, { useState } from 'react'
import { Home, Users, CheckSquare, BarChart, Search, DollarSign, ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    className={`flex flex-col items-center justify-center p-2 ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`}
    onClick={onClick}
  >
    <Icon size={24} />
    <span className="text-xs mt-1">{label}</span>
  </button>
)

const ProductCard = ({ image, name, price }) => (
  <Card>
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-green-600 font-bold mt-2">${price.toFixed(2)}</p>
    </CardContent>
  </Card>
)

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  const products = [
    { id: 1, name: "Smartphone", price: 599.99, category: "electronics", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Laptop", price: 999.99, category: "electronics", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Running Shoes", price: 79.99, category: "sports", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Coffee Maker", price: 49.99, category: "home", image: "/placeholder.svg?height=200&width=200" },
    { id: 5, name: "Backpack", price: 39.99, category: "accessories", image: "/placeholder.svg?height=200&width=200" },
    { id: 6, name: "Headphones", price: 129.99, category: "electronics", image: "/placeholder.svg?height=200&width=200" },
  ]

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'all' || product.category === category)
  )

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

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

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select defaultValue="thisMonth">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="thisQuarter">This Quarter</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend="up" trendValue="20.1%" />
        <StatCard title="New Customers" value="2,350" icon={Users} trend="up" trendValue="18.2%" />
        <StatCard title="Total Orders" value="1,789" icon={ShoppingBag} trend="down" trendValue="3.1%" />
        <StatCard title="Conversion Rate" value="3.24%" icon={TrendingUp} trend="up" trendValue="0.2%" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
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
        <Button variant="outline">
          Download Report
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home')

  const tabs = [
    { id: 'Home', icon: Home, label: 'Home', content: <HomeScreen /> },
    { id: 'Team', icon: Users, label: 'Team', content: <div className="p-4">Team Content</div> },
    { id: 'Tasks', icon: CheckSquare, label: 'Tasks', content: <div className="p-4">Tasks Content</div> },
    { id: 'Dashboard', icon: BarChart, label: 'Dashboard', content: <Dashboard /> },
  ]

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto p-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </main>
      <nav className="flex justify-around border-t border-border bg-background">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </nav>
    </div>
  )
}
