import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { CategoryBadge } from '@/components/products/CategoryBadge';
import { useProducts, ProductFilters as FiltersType } from '@/context/ProductContext';
import { categories, Category } from '@/data/products';
import { useState } from 'react';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { products, filterProducts } = useProducts();
  
  const categoryData = categories.find((c) => c.id === category);
  const validCategory = categoryData ? (category as Category) : null;

  const categoryProducts = validCategory
    ? products.filter((p) => p.category === validCategory)
    : [];
  
  const maxPrice = Math.max(...categoryProducts.map((p) => p.price), 0);

  const [filters, setFilters] = useState<FiltersType>({
    category: validCategory || 'all',
    sortBy: 'newest',
  });

  const filteredProducts = filterProducts({
    ...filters,
    category: validCategory || 'all',
  });

  if (!validCategory || !categoryData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Category Not Found
          </h1>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <CategoryBadge category={validCategory} />
          <h1
            className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-2"
            data-semtag-id="category.name"
            data-semtag-role="observable"
            data-semtag-state="category.name"
          >
            {categoryData.name}
          </h1>
          <p className="text-muted-foreground">
            {categoryData.description}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onFiltersChange={(newFilters) => setFilters({ ...newFilters, category: validCategory })}
            maxPrice={maxPrice || 1000}
            semtagControls="category.grid"
          />
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          emptyMessage={`No ${categoryData.name.toLowerCase()} products found.`}
          semtagId="category.grid"
        />
      </div>
    </Layout>
  );
};

export default CategoryPage;
