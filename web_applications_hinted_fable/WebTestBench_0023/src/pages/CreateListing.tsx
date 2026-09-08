import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, X, Leaf } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { categories, conditions } from '@/data/mockData';
import { Category, Condition } from '@/types';

const sampleImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&h=600&fit=crop',
];

export default function CreateListing() {
  const navigate = useNavigate();
  const { addProduct, isAuthenticated, currentUser } = useApp();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [condition, setCondition] = useState<Condition | ''>('');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [isUpcycled, setIsUpcycled] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const addSampleImage = () => {
    if (images.length < 4) {
      const availableImages = sampleImages.filter(img => !images.includes(img));
      if (availableImages.length > 0) {
        setImages([...images, availableImages[0]]);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !price || !category || !condition || !location) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    addProduct({
      title,
      description,
      price: parseFloat(price),
      images,
      category: category as Category,
      condition: condition as Condition,
      location,
      isUpcycled,
      isAvailable: true
    });

    toast.success('Listing created successfully!');
    navigate('/my-listings');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Create a Listing</h1>
          <p className="text-muted-foreground mt-2">Share your item with the community</p>
        </div>

        <form
          onSubmit={handleSubmit}
          data-semtag-id="listing.form"
          data-semtag-role="region"
          className="space-y-6"
        >
          {/* Images */}
          <div className="space-y-3">
            <Label>Photos</Label>
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={image} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <button
                  type="button"
                  onClick={addSampleImage}
                  data-semtag-id="listing.photos.add"
                  data-semtag-role="action"
                  data-semtag-action="add-photo"
                  className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs">Add Photo</span>
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Click to add sample images (up to 4)</p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="What are you selling?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-semtag-id="listing.title"
              data-semtag-role="input"
              data-semtag-state="listing.title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your item in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-semtag-id="listing.description"
              data-semtag-role="input"
              data-semtag-state="listing.description"
              rows={4}
              required
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                data-semtag-id="listing.price"
                data-semtag-role="input"
                data-semtag-state="listing.price"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger
                  data-semtag-id="listing.category"
                  data-semtag-role="select"
                  data-semtag-state="listing.category"
                  data-semtag-options={categories.map((c) => `${c.value}|${c.label}`).join(';')}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.value}
                      value={cat.value}
                      data-semtag-id={`listing.category.option.${cat.value}`}
                      data-semtag-role="option"
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Condition & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Condition *</Label>
              <Select value={condition} onValueChange={(v) => setCondition(v as Condition)}>
                <SelectTrigger
                  data-semtag-id="listing.condition"
                  data-semtag-role="select"
                  data-semtag-state="listing.condition"
                  data-semtag-options={conditions.map((c) => `${c.value}|${c.label}`).join(';')}
                >
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((cond) => (
                    <SelectItem
                      key={cond.value}
                      value={cond.value}
                      data-semtag-id={`listing.condition.option.${cond.value}`}
                      data-semtag-role="option"
                    >
                      {cond.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                data-semtag-id="listing.location"
                data-semtag-role="input"
                data-semtag-state="listing.location"
                required
              />
            </div>
          </div>

          {/* Upcycled Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Upcycled Item</p>
                <p className="text-sm text-muted-foreground">This item was made from recycled materials</p>
              </div>
            </div>
            <Switch
              checked={isUpcycled}
              onCheckedChange={setIsUpcycled}
              data-semtag-id="listing.upcycled"
              data-semtag-role="toggle"
              data-semtag-state="listing.upcycled"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate(-1)}
              data-semtag-id="listing.cancel"
              data-semtag-role="action"
              data-semtag-action="cancel-listing"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={isLoading}
              data-semtag-id="listing.submit"
              data-semtag-role="action"
              data-semtag-action="create-listing"
            >
              {isLoading ? 'Creating...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
