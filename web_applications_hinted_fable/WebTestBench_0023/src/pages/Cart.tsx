import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, cartTotal, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleCheckout = () => {
    toast.success('Purchase requests sent to sellers!');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            Your Cart
          </h1>
          <p
            data-semtag-id="cart.count"
            data-semtag-role="observable"
            data-semtag-state="cart.count"
            className="text-muted-foreground mt-1"
          >
            {cart.length} item{cart.length !== 1 ? 's' : ''}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-dashed border-border">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2
              data-semtag-id="cart.empty"
              data-semtag-role="observable"
              data-semtag-state="cart.count"
              className="font-display text-xl font-semibold mb-2"
            >
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-4">Find something you love!</p>
            <Button
              variant="hero"
              onClick={() => navigate('/')}
              data-semtag-id="cart.empty.browse"
              data-semtag-role="navigation"
              data-semtag-target="home.page"
            >
              Browse Items
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div data-semtag-id="cart.items" data-semtag-role="collection" className="space-y-4">
              {cart.map(({ product }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-card"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      data-semtag-id={`cart.items.item.${product.id}`}
                      data-semtag-role="navigation"
                      data-semtag-target="product.detail"
                      className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">{product.location}</p>
                    <p
                      data-semtag-id={`cart.items.item.${product.id}.price`}
                      data-semtag-role="observable"
                      data-semtag-state="product.price"
                      className="font-display text-lg font-semibold text-primary"
                    >
                      ${product.price}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    data-semtag-id={`cart.items.item.${product.id}.remove`}
                    data-semtag-role="action"
                    data-semtag-action="remove-from-cart"
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => {
                      removeFromCart(product.id);
                      toast.success('Removed from cart');
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Total</span>
                <span
                  data-semtag-id="cart.total"
                  data-semtag-role="observable"
                  data-semtag-state="cart.total"
                  className="font-display text-2xl font-bold text-primary"
                >
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full"
                  onClick={handleCheckout}
                  data-semtag-id="cart.checkout"
                  data-semtag-role="action"
                  data-semtag-action="send-purchase-request"
                >
                  Send Purchase Request
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Sellers will be notified and can accept your request
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
