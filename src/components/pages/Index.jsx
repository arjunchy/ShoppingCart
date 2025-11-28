import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../Navbar';
import { FilterBar } from '../FilterBar';
import { ProductGrid } from '../ProductGrid';
import { CartDrawer } from '../CartDrawer';
import { useProducts, useCategories, sortProducts } from '../hooks/useProducts';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default'); // Removed <SortOption> type

  const { products, loading, loadingMore, hasMore, loadMore, total } = useProducts(searchQuery, selectedCategory);
  const { categories, loading: categoriesLoading } = useCategories();

  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortOption);
  }, [products, sortOption]);

  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
  });

  return (
    <>

      <div className="min-h-screen bg-background">
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              Shop the Best Deals
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover a wide range of premium products at prices you’ll love
            </p>
          </section>

          {/* Filters */}
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalProducts={sortedProducts.length}
            totalAvailable={total}
            categoriesLoading={categoriesLoading}
            isSearching={!!searchQuery.trim()}
          />

          {/* Products Grid */}
          <ProductGrid products={sortedProducts} loading={loading} loadingMore={loadingMore} />

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="h-4" />

          {/* Loading more indicator */}
          {loadingMore && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          )}

          {/* End of products */}
          {!hasMore && products.length > 0 && (
            <p className="text-center text-muted-foreground py-8">
              You've seen all {total} products!
            </p>
          )}
        </main>

        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </>
  );
};

export default Index;
