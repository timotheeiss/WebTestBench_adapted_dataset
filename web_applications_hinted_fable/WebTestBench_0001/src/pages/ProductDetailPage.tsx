import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Tag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/products/RatingStars';
import { CategoryBadge } from '@/components/products/CategoryBadge';
import { ProductCard } from '@/components/products/ProductCard';
import { useProducts } from '@/context/ProductContext';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug, getProductsByCategory } = useProducts();
  
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products" data-semtag-id="product.notfound.browse" data-semtag-role="navigation" data-semtag-target="products.page">Browse All Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          data-semtag-id="product.back"
          data-semtag-role="navigation"
          data-semtag-target="products.page"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image */}
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <CategoryBadge category={product.category} />
              <RatingStars
                rating={product.rating}
                size="md"
                data-semtag-id="product.rating"
                data-semtag-role="observable"
                data-semtag-state="product.rating"
              />
            </div>

            <h1
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
              data-semtag-id="product.name"
              data-semtag-role="observable"
              data-semtag-state="product.name"
            >
              {product.name}
            </h1>

            <p
              className="text-lg text-muted-foreground mb-6"
              data-semtag-id="product.description"
              data-semtag-role="observable"
              data-semtag-state="product.description"
            >
              {product.shortDescription}
            </p>

            <div className="flex items-baseline gap-4 mb-6">
              <span
                className="font-display text-4xl font-bold text-foreground"
                data-semtag-id="product.price"
                data-semtag-role="observable"
                data-semtag-state="product.price"
              >
                {formatPrice(product.price)}
              </span>
            </div>

            {/* CTA Button */}
            <Button
              variant="affiliate"
              size="xl"
              asChild
              className="w-full sm:w-auto mb-8"
            >
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                data-semtag-id="product.buy"
                data-semtag-role="action"
                data-semtag-action="buy-product"
              >
                Buy Now
                <ExternalLink className="h-5 w-5 ml-2" />
              </a>
            </Button>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mb-8"
              data-semtag-id="product.tags"
              data-semtag-role="collection"
            >
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  data-semtag-id={`product.tags.item.${tag}`}
                  data-semtag-role="observable"
                  className="inline-flex items-center gap-1 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border">
                <h3 className="font-display font-semibold text-foreground">
                  Key Specifications
                </h3>
              </div>
              <div
                className="divide-y divide-border"
                data-semtag-id="product.specs"
                data-semtag-role="collection"
              >
                {product.specs.map((spec, index) => (
                  <div
                    key={index}
                    data-semtag-id={`product.specs.item.${spec.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
                    data-semtag-role="observable"
                    className="flex justify-between px-4 py-3"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Full Review */}
        <section className="max-w-3xl mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            My Review
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p
              className="leading-relaxed"
              data-semtag-id="product.review"
              data-semtag-role="observable"
              data-semtag-state="product.review"
            >{product.fullReview}</p>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              More in {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-semtag-id="product.related"
              data-semtag-role="collection"
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} semtagCollection="product.related" />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
