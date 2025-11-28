import React from "react";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "./context/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";

export const Navbar = ({ searchQuery, onSearchChange }) => {
  const { toggleCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
            <Store className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold hidden sm:block">ShopHub</span>
        </div>

        {/* Search */}
        <SearchBar value={searchQuery} onChange={onSearchChange} />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center animate-bounce-subtle">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
