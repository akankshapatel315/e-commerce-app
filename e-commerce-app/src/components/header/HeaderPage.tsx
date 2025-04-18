import { ShoppingCart } from "lucide-react"

export const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">🛍️ Shoppy</h1>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </header>
  )
}
