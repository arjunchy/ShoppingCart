import React from "react";

export const ProductSkeleton = () => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-card">
      <div className="aspect-square bg-muted animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted animate-shimmer rounded w-1/3" />
        <div className="h-5 bg-muted animate-shimmer rounded w-3/4" />
        <div className="h-4 bg-muted animate-shimmer rounded w-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-muted animate-shimmer rounded w-1/4" />
          <div className="h-9 bg-muted animate-shimmer rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export const ProductSkeletonGrid = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </>
  );
};
