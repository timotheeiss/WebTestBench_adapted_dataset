import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryBadge } from '@/components/products/CategoryBadge';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/ProductContext';
import { categories, Category } from '@/data/products';

const Index = () => {
  const { getFeaturedProducts, getProductsByCategory } = useProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative hero-gradient py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Hand-picked recommendations
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover Products
              <span className="text-primary block mt-2">Worth Your Money</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Curated tech gadgets, home essentials, and fitness gear — personally tested and honestly reviewed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg">
                <Link
                  to="/products"
                  data-semtag-id="home.hero.browse-all"
                  data-semtag-role="navigation"
                  data-semtag-target="products.page"
                >
                  Browse All Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  to="/category/tech"
                  data-semtag-id="home.hero.explore-tech"
                  data-semtag-role="navigation"
                  data-semtag-target="category.tech"
                >Explore Tech</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Featured</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Editor's Top Picks
                </h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link
                  to="/products?featured=true"
                  data-semtag-id="home.featured.view-all"
                  data-semtag-role="navigation"
                  data-semtag-target="products.page"
                >
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-semtag-id="home.featured"
              data-semtag-role="collection"
            >
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} semtagCollection="home.featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Find exactly what you're looking for across our three main categories.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-semtag-id="home.categories"
            data-semtag-role="collection"
          >
            {categories.map((category) => {
              const categoryProducts = getProductsByCategory(category.id as Category);
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  data-semtag-id={`home.categories.item.${category.id}`}
                  data-semtag-role="navigation"
                  data-semtag-target={`category.${category.id}`}
                  className="group relative bg-card rounded-xl p-6 border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
                >
                  <CategoryBadge category={category.id as Category} />
                  <h3 className="font-display text-xl font-semibold text-foreground mt-4 mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span
                      data-semtag-id={`home.categories.item.${category.id}.count`}
                      data-semtag-role="observable"
                      data-semtag-state="category.product-count"
                    >{categoryProducts.length} products</span>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Products per Category */}
      {categories.map((category) => {
        const categoryProducts = getProductsByCategory(category.id as Category).slice(0, 3);
        if (categoryProducts.length === 0) return null;

        return (
          <section key={category.id} className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <CategoryBadge category={category.id as Category} />
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">
                    {category.name}
                  </h2>
                </div>
                <Button asChild variant="ghost">
                  <Link
                    to={`/category/${category.id}`}
                    data-semtag-id={`home.latest.${category.id}.view-all`}
                    data-semtag-role="navigation"
                    data-semtag-target={`category.${category.id}`}
                  >
                    View all
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                data-semtag-id={`home.latest.${category.id}`}
                data-semtag-role="collection"
              >
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} semtagCollection={`home.latest.${category.id}`} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </Layout>
  );
};

export default Index;
