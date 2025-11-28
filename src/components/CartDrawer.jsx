import React, { useState } from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./context/CartContext";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { formatNPR } from "./lib/currency";

export const CartDrawer = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    totalItems, 
    totalPrice, 
    clearCart 
  } = useCart();

  const [showThankYou, setShowThankYou] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowThankYou(true);
    clearCart();
  };

  const closeThankYou = () => {
    setShowThankYou(false);
    closeCart(); 
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-drawer z-50 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <span className="text-sm text-muted-foreground">({totalItems} items)</span>
            </div>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">Add some products to get started</p>
              <Button onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-secondary/30 rounded-lg">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium line-clamp-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="font-semibold text-accent">{formatNPR(item.price)}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="border-t border-border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-bold">{formatNPR(totalPrice)}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}

          {showThankYou && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-60">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-2">Thank you for shopping!</h3>
                <p className="text-muted-foreground mb-4">
                  Your order has been placed successfully.
                </p>
                <Button onClick={closeThankYou}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
