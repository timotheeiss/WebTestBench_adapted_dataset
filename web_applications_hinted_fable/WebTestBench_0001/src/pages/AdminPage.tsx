import { useState } from 'react';
import { Plus, Pencil, Trash2, Star, Save, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryBadge } from '@/components/products/CategoryBadge';
import { RatingStars } from '@/components/products/RatingStars';
import { useProducts } from '@/context/ProductContext';
import { Product, Category, categories } from '@/data/products';
import { toast } from 'sonner';

type ProductFormData = Omit<Product, 'id' | 'slug' | 'createdAt'>;

const emptyProduct: ProductFormData = {
  name: '',
  category: 'tech',
  tags: [],
  price: 0,
  rating: 4.5,
  shortDescription: '',
  fullReview: '',
  specs: [{ label: '', value: '' }],
  imageUrl: '',
  affiliateLink: '',
  featured: false,
};

const AdminPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(emptyProduct);
  const [tagsInput, setTagsInput] = useState('');

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData(emptyProduct);
    setTagsInput('');
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setIsCreating(false);
    setFormData({
      name: product.name,
      category: product.category,
      tags: product.tags,
      price: product.price,
      rating: product.rating,
      shortDescription: product.shortDescription,
      fullReview: product.fullReview,
      specs: product.specs,
      imageUrl: product.imageUrl,
      affiliateLink: product.affiliateLink,
      featured: product.featured,
    });
    setTagsInput(product.tags.join(', '));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData(emptyProduct);
    setTagsInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const specs = formData.specs.filter((s) => s.label && s.value);

    if (!formData.name || !formData.shortDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productData = { ...formData, tags, specs };

    if (isCreating) {
      addProduct(productData);
      toast.success('Product created successfully');
    } else if (editingId) {
      updateProduct(editingId, productData);
      toast.success('Product updated successfully');
    }

    cancelEdit();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      toast.success('Product deleted successfully');
    }
  };

  const addSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { label: '', value: '' }],
    }));
  };

  const updateSpec = (index: number, field: 'label' | 'value', value: string) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  const removeSpec = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage your product recommendations
            </p>
          </div>
          {!isCreating && !editingId && (
            <Button
              onClick={startCreate}
              data-semtag-id="admin.add-product"
              data-semtag-role="action"
              data-semtag-action="add-product"
              data-semtag-controls="admin.form"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <Card className="mb-8 animate-fade-in" data-semtag-id="admin.form" data-semtag-role="region">
            <CardHeader>
              <CardTitle>
                {isCreating ? 'Create New Product' : 'Edit Product'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      data-semtag-id="admin.form.name"
                      data-semtag-role="input"
                      data-semtag-state="product.name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Sony WH-1000XM5"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as Category }))}
                    >
                      <SelectTrigger
                        data-semtag-id="admin.form.category"
                        data-semtag-role="select"
                        data-semtag-state="product.category"
                        data-semtag-options={categories.map((cat) => `${cat.id}|${cat.name}`).join(';')}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id}
                            data-semtag-id={`admin.form.category.option.${cat.id}`}
                            data-semtag-role="option"
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      data-semtag-id="admin.form.price"
                      data-semtag-role="input"
                      data-semtag-state="product.price"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      data-semtag-id="admin.form.rating"
                      data-semtag-role="input"
                      data-semtag-state="product.rating"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      data-semtag-id="admin.form.image-url"
                      data-semtag-role="input"
                      data-semtag-state="product.image-url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>

                  {/* Affiliate Link */}
                  <div className="space-y-2">
                    <Label htmlFor="affiliateLink">Affiliate Link</Label>
                    <Input
                      id="affiliateLink"
                      data-semtag-id="admin.form.affiliate-link"
                      data-semtag-role="input"
                      data-semtag-state="product.affiliate-link"
                      value={formData.affiliateLink}
                      onChange={(e) => setFormData((prev) => ({ ...prev, affiliateLink: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    data-semtag-id="admin.form.tags"
                    data-semtag-role="input"
                    data-semtag-state="product.tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g., wireless, premium, noise-cancelling"
                  />
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    data-semtag-id="admin.form.description"
                    data-semtag-role="input"
                    data-semtag-state="product.description"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                    rows={2}
                  />
                </div>

                {/* Full Review */}
                <div className="space-y-2">
                  <Label htmlFor="fullReview">Full Review</Label>
                  <Textarea
                    id="fullReview"
                    data-semtag-id="admin.form.review"
                    data-semtag-role="input"
                    data-semtag-state="product.review"
                    value={formData.fullReview}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullReview: e.target.value }))}
                    rows={5}
                  />
                </div>

                {/* Specs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Specifications</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSpec}
                      data-semtag-id="admin.form.specs.add"
                      data-semtag-role="action"
                      data-semtag-action="add-spec-row"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Spec
                    </Button>
                  </div>
                  {formData.specs.map((spec, index) => (
                    <div key={index} className="flex gap-3">
                      <Input
                        placeholder="Label"
                        value={spec.label}
                        onChange={(e) => updateSpec(index, 'label', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpec(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <Switch
                    data-semtag-id="admin.form.featured"
                    data-semtag-role="toggle"
                    data-semtag-state="product.featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                  />
                  <Label>Featured on homepage</Label>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    data-semtag-id="admin.form.submit"
                    data-semtag-role="action"
                    data-semtag-action="save-product"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isCreating ? 'Create Product' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEdit}
                    data-semtag-id="admin.form.cancel"
                    data-semtag-role="action"
                    data-semtag-action="cancel-edit"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Product List */}
        <div
          className="space-y-4"
          data-semtag-id="admin.products"
          data-semtag-role="collection"
        >
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-40 h-32 sm:h-auto shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryBadge category={product.category} size="sm" />
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 text-xs text-accent">
                          <Star className="h-3 w-3 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-display font-semibold text-foreground mb-1"
                      data-semtag-id={`admin.products.item.${product.id}`}
                      data-semtag-role="observable"
                      data-semtag-state="product.name"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span
                        data-semtag-id={`admin.products.item.${product.id}.price`}
                        data-semtag-role="observable"
                        data-semtag-state="product.price"
                      >{formatPrice(product.price)}</span>
                      <RatingStars
                        rating={product.rating}
                        size="sm"
                        data-semtag-id={`admin.products.item.${product.id}.rating`}
                        data-semtag-role="observable"
                        data-semtag-state="product.rating"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(product)}
                      data-semtag-id={`admin.products.item.${product.id}.edit`}
                      data-semtag-role="action"
                      data-semtag-action="edit-product"
                      data-semtag-controls="admin.form"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-destructive hover:text-destructive"
                      data-semtag-id={`admin.products.item.${product.id}.delete`}
                      data-semtag-role="action"
                      data-semtag-action="delete-product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
