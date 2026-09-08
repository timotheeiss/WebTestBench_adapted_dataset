import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Recycle, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { conditions, categories } from '@/data/mockData';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getUserById, addToCart, sendPurchaseRequest, isAuthenticated, currentUser } = useApp();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const product = getProductById(id || '');
  const seller = product ? getUserById(product.sellerId) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-16 text-center">
          <h1
            data-semtag-id="product.not-found"
            data-semtag-role="observable"
            data-semtag-state="product.availability"
            className="font-display text-2xl font-bold mb-4"
          >
            Product not found
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            data-semtag-id="product.back-to-browse"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
          >
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  const conditionLabel = conditions.find(c => c.value === product.condition)?.label || product.condition;
  const categoryLabel = categories.find(c => c.value === product.category)?.label || product.category;
  const isOwnProduct = currentUser?.id === product.sellerId;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart');
      navigate('/login');
      return;
    }
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendPurchaseRequest(product.id, message);
    setMessage('');
    setMessageDialogOpen(false);
    toast.success('Message sent to seller!');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link
            to="/"
            data-semtag-id="product.breadcrumb.home"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/?category=${product.category}`}
            data-semtag-id="product.breadcrumb.category"
            data-semtag-role="navigation"
            data-semtag-target="home.browse"
            className="hover:text-foreground transition-colors"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    data-semtag-id="product.images.prev"
                    data-semtag-role="action"
                    data-semtag-action="show-previous-image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    data-semtag-id="product.images.next"
                    data-semtag-role="action"
                    data-semtag-action="show-next-image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              {product.isUpcycled && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground gap-1 backdrop-blur-sm">
                    <Recycle className="h-3 w-3" />
                    Upcycled
                  </Badge>
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Badge
                  variant="secondary"
                  data-semtag-id="product.category"
                  data-semtag-role="observable"
                  data-semtag-state="product.category"
                >
                  {categoryLabel}
                </Badge>
                <Badge
                  variant="outline"
                  data-semtag-id="product.condition"
                  data-semtag-role="observable"
                  data-semtag-state="product.condition"
                >
                  {conditionLabel}
                </Badge>
              </div>
              <h1
                data-semtag-id="product.title"
                data-semtag-role="observable"
                data-semtag-state="product.title"
                className="font-display text-3xl font-bold text-foreground mb-2"
              >
                {product.title}
              </h1>
              <p
                data-semtag-id="product.price"
                data-semtag-role="observable"
                data-semtag-state="product.price"
                className="font-display text-4xl font-bold text-primary"
              >
                ${product.price}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {product.location}
                {product.distance && ` (${product.distance} mi)`}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Listed {product.createdAt}
              </span>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="font-display font-semibold mb-3">Description</h2>
              <p
                data-semtag-id="product.description"
                data-semtag-role="observable"
                data-semtag-state="product.description"
                className="text-muted-foreground leading-relaxed"
              >
                {product.description}
              </p>
            </div>

            {/* Seller Info */}
            {seller && (
              <div className="border-t border-border pt-6">
                <h2 className="font-display font-semibold mb-3">Seller</h2>
                <div className="flex items-center gap-3">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-border"
                  />
                  <div>
                    <p
                      data-semtag-id="product.seller.name"
                      data-semtag-role="observable"
                      data-semtag-state="product.seller"
                      className="font-medium"
                    >
                      {seller.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{seller.location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            {!isOwnProduct && product.isAvailable && (
              <div className="border-t border-border pt-6 space-y-3">
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full"
                  onClick={handleAddToCart}
                  data-semtag-id="product.add-to-cart"
                  data-semtag-role="action"
                  data-semtag-action="add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>

                <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="xl"
                      className="w-full"
                      data-semtag-id="product.message-seller"
                      data-semtag-role="action"
                      data-semtag-action="open-message-dialog"
                      data-semtag-controls="product.message.dialog"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Message Seller
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    data-semtag-id="product.message.dialog"
                    data-semtag-role="region"
                  >
                    <DialogHeader>
                      <DialogTitle>Send a message to {seller?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Textarea
                        placeholder="Hi, I'm interested in this item..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        data-semtag-id="product.message.text"
                        data-semtag-role="input"
                        data-semtag-state="message.text"
                      />
                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={handleSendMessage}
                        disabled={!message.trim() || !isAuthenticated}
                        data-semtag-id="product.message.send"
                        data-semtag-role="action"
                        data-semtag-action="send-message"
                      >
                        {isAuthenticated ? 'Send Message' : 'Log in to message'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {isOwnProduct && (
              <div className="border-t border-border pt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/my-listings')}
                  data-semtag-id="product.manage-listings"
                  data-semtag-role="navigation"
                  data-semtag-target="my-listings.page"
                >
                  <User className="h-4 w-4 mr-2" />
                  Manage Your Listings
                </Button>
              </div>
            )}

            {!product.isAvailable && (
              <div className="border-t border-border pt-6">
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p
                    data-semtag-id="product.unavailable"
                    data-semtag-role="observable"
                    data-semtag-state="product.availability"
                    className="font-medium text-muted-foreground"
                  >
                    This item is no longer available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
