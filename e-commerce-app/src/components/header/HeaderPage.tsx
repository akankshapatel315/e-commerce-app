import { useSelector } from "react-redux"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { RootState } from "redux/store"
import CartModal from "../cart-modal/CartModal"

const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0))
  const [open, setOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold">🛍️ ShopEasy</h1>

      {/* Button outside the Dialog */}
      <button className="relative" onClick={() => setOpen(true)}>
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <CartModal open={open} onOpenChange={setOpen} />
    </header>
  )
}

export default Header
