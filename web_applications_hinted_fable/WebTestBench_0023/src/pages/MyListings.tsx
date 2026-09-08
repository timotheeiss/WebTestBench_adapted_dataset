import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function MyListings() {
  const navigate = useNavigate();
  const { currentUser, getProductsBySeller, updateProduct, deleteProduct, isAuthenticated } = useApp();

  if (!isAuthenticated || !currentUser) {
    navigate('/login');
    return null;
  }

  const myProducts = getProductsBySeller(currentUser.id);

  const toggleAvailability = (productId: string, currentStatus: boolean) => {
    updateProduct(productId, { isAvailable: !currentStatus });
    toast.success(currentStatus ? 'Item marked as sold' : 'Item marked as available');
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    toast.success('Listing deleted');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground mt-1">Manage your items for sale</p>
          </div>
          <Button
            variant="hero"
            onClick={() => navigate('/create-listing')}
            data-semtag-id="my-listings.new"
            data-semtag-role="navigation"
            data-semtag-target="create-listing.page"
          >
            <Plus className="h-4 w-4" />
            New Listing
          </Button>
        </div>

        {myProducts.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-dashed border-border">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2
              data-semtag-id="my-listings.empty"
              data-semtag-role="observable"
              data-semtag-state="my-listings.count"
              className="font-display text-xl font-semibold mb-2"
            >
              No listings yet
            </h2>
            <p className="text-muted-foreground mb-4">Start selling by creating your first listing</p>
            <Button
              variant="hero"
              onClick={() => navigate('/create-listing')}
              data-semtag-id="my-listings.empty.create"
              data-semtag-role="navigation"
              data-semtag-target="create-listing.page"
            >
              Create Listing
            </Button>
          </div>
        ) : (
          <div data-semtag-id="my-listings.list" data-semtag-role="collection" className="space-y-4">
            {myProducts.map((product) => (
              <div 
                key={product.id}
                className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3
                        data-semtag-id={`my-listings.list.item.${product.id}`}
                        data-semtag-role="observable"
                        data-semtag-state="product.title"
                        className="font-medium text-foreground line-clamp-1"
                      >
                        {product.title}
                      </h3>
                      <p
                        data-semtag-id={`my-listings.list.item.${product.id}.price`}
                        data-semtag-role="observable"
                        data-semtag-state="product.price"
                        className="font-display text-lg font-semibold text-primary"
                      >
                        ${product.price}
                      </p>
                    </div>
                    <Badge
                      variant={product.isAvailable ? 'default' : 'secondary'}
                      data-semtag-id={`my-listings.list.item.${product.id}.status`}
                      data-semtag-role="observable"
                      data-semtag-state="product.availability"
                    >
                      {product.isAvailable ? 'Active' : 'Sold'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/product/${product.id}`)}
                      data-semtag-id={`my-listings.list.item.${product.id}.view`}
                      data-semtag-role="navigation"
                      data-semtag-target="product.detail"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAvailability(product.id, product.isAvailable)}
                      data-semtag-id={`my-listings.list.item.${product.id}.toggle-availability`}
                      data-semtag-role="action"
                      data-semtag-action="toggle-availability"
                      data-semtag-state="product.availability"
                    >
                      {product.isAvailable ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Mark Sold
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Mark Available
                        </>
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          data-semtag-id={`my-listings.list.item.${product.id}.delete`}
                          data-semtag-role="action"
                          data-semtag-action="open-delete-dialog"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        data-semtag-id={`my-listings.list.item.${product.id}.delete.dialog`}
                        data-semtag-role="region"
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your listing.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            data-semtag-id={`my-listings.list.item.${product.id}.delete.cancel`}
                            data-semtag-role="action"
                            data-semtag-action="cancel-delete"
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.id)}
                            data-semtag-id={`my-listings.list.item.${product.id}.delete.confirm`}
                            data-semtag-role="action"
                            data-semtag-action="confirm-delete"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
