import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { X } from "lucide-react"
  import { useDispatch, useSelector } from "react-redux"
  import { RootState } from "../../../redux/store"
  import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } from "../../../redux/slices/cartSlice"
  
  interface CartModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
  }
  
  const CartModal = ({ open, onOpenChange }: CartModalProps) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle>Your Cart</DialogTitle>
            <DialogClose asChild>
              <Button size="icon" variant="ghost">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </DialogHeader>
  
          {cartItems.length === 0 ? (
            <p className="text-center text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b pb-2"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      🗑
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
  
          {cartItems.length > 0 && (
            <div className="pt-4 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }
  
  export default CartModal
  