import React, { useState } from "react";
import { ShoppingCart, Star, Check } from "lucide-react";
import { useCart } from "./context/CartContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { formatNPR } from "./lib/currency";

export const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div
      className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        {!imageLoaded && <div className="absolute inset-0 bg-muted animate-shimmer" />}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {product.discountPercentage > 10 && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0">
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>

        <h3 className="font-semibold text-card-foreground line-clamp-1 group-hover:text-accent transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">• {product.brand}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-card-foreground">
              {formatNPR(discountedPrice)}
            </span>
            {product.discountPercentage > 10 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatNPR(product.price)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={added}
            className={`transition-all duration-300 ${
              added
                ? "bg-success text-success-foreground"
                : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
