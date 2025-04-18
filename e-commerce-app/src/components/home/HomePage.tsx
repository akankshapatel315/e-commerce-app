
import  { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
}

const PRODUCTS_PER_PAGE = 12

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchProducts = async (category = "all") => {
    setLoading(true)
    try {
      const url =
        category === "all"
          ? `https://dummyjson.com/products?limit=100`
          : `https://dummyjson.com/products/category/${category}`
      const response = await axios.get(url)
      setProducts(response.data.products)
    } catch (error) {
      console.error("Error fetching products", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products/category-list')
      setCategories(["all", ...res.data])
    } catch (error) {
      console.error("Error fetching categories", error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategory)
    setCurrentPage(1)
  }, [selectedCategory])

  // Pagination Logic
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIdx = startIdx + PRODUCTS_PER_PAGE
  const paginatedProducts = products.slice(startIdx, endIdx)
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center">🛒 Product Store</h1>

      <div className="flex justify-between items-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-600">
          Showing {startIdx + 1}–{Math.min(endIdx, products.length)} of {products.length}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition">
                <CardContent className="p-4 space-y-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-md font-semibold truncate">{product.title}</h3>
                    <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-blue-600 font-bold">${product.price}</p>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 pt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

