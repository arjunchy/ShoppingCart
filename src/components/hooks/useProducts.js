import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE = 'https://dummyjson.com';
const PRODUCTS_PER_PAGE = 12;
const ALLOWED_CATEGORIES = ['smartphones', 'laptops', 'fragrances', 'skincare'];

export const useProducts = (searchQuery = '', category = 'all') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const abortControllerRef = useRef(null);

  const fetchProducts = useCallback(async (skipCount = 0, append = false, search = '', cat = 'all') => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setProducts([]);
      }

      let allProducts = [];

      if (search.trim()) {
        const response = await fetch(
          `${API_BASE}/products/search?q=${encodeURIComponent(search.trim())}&limit=100`,
          { signal: abortControllerRef.current.signal }
        );
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        allProducts = data.products.filter(p => ALLOWED_CATEGORIES.includes(p.category));
      } else if (cat && cat !== 'all') {
        const response = await fetch(
          `${API_BASE}/products/category/${encodeURIComponent(cat)}?limit=50`,
          { signal: abortControllerRef.current.signal }
        );
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        allProducts = data.products;
      } else {
        const categoryPromises = ALLOWED_CATEGORIES.map(async (catSlug) => {
          const response = await fetch(
            `${API_BASE}/products/category/${catSlug}?limit=50`,
            { signal: abortControllerRef.current.signal }
          );
          if (!response.ok) return [];
          const data = await response.json();
          return data.products;
        });
        const results = await Promise.all(categoryPromises);
        allProducts = results.flat();
      }

      const paginatedProducts = allProducts.slice(skipCount, skipCount + PRODUCTS_PER_PAGE);

      setProducts(prev => append ? [...prev, ...paginatedProducts] : paginatedProducts);
      setTotal(allProducts.length);
      setHasMore(skipCount + paginatedProducts.length < allProducts.length);
      setSkip(skipCount + paginatedProducts.length);
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchProducts(skip, true, searchQuery, category);
    }
  }, [fetchProducts, loadingMore, hasMore, skip, searchQuery, category]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSkip(0);
      setHasMore(true);
      fetchProducts(0, false, searchQuery, category);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, category]);

  return { products, loading, loadingMore, error, hasMore, loadMore, total };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allowedCats = [
      { slug: 'smartphones', name: 'Smartphones' },
      { slug: 'laptops', name: 'Laptops' },
      { slug: 'fragrances', name: 'Fragrances' },
      { slug: 'skincare', name: 'Skincare' },
    ];
    setCategories(allowedCats);
    setLoading(false);
  }, []);

  return { categories, loading };
};

export const sortProducts = (products, sortOption) => {
  const sorted = [...products];

  switch (sortOption) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return sorted;
};
