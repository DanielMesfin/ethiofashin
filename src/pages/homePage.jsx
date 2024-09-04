

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
            <input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <select
            value={category}
            onValueChange={setCategory}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="sports">Sports</option>
            <option value="home">Home</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    )
  }
  export default Home