import { useSelector } from "react-redux"
import { ShoppingCart } from "lucide-react"
import { RootState } from "redux/store"

const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length)

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold">🛍️ ShopEasy</h1>
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </header>
  )
}

export default Header
