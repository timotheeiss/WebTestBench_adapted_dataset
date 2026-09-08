import { Product } from '@/data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  /** data-semtag collection id for this grid; omit to emit no hints */
  semtagId?: string;
}

export const ProductGrid = ({ products, emptyMessage = 'No products found.', semtagId }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p
          className="text-muted-foreground text-lg"
          {...(semtagId && {
            'data-semtag-id': `${semtagId}.empty`,
            'data-semtag-role': 'observable',
          })}
        >
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      {...(semtagId && {
        'data-semtag-id': semtagId,
        'data-semtag-role': 'collection',
      })}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} semtagCollection={semtagId} />
      ))}
    </div>
  );
};
