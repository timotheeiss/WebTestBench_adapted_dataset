import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useReservations } from '@/context/ReservationContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ReviewFormProps {
  restaurantId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ restaurantId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [comment, setComment] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addReview } = useReservations();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !guestName || !comment || !visitDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields and select a rating.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    addReview({
      restaurantId,
      guestName,
      rating,
      comment,
      visitDate,
    });

    toast({
      title: 'Review Submitted!',
      description: 'Thank you for sharing your experience.',
    });

    setRating(0);
    setGuestName('');
    setComment('');
    setVisitDate('');
    setIsSubmitting(false);
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-semtag-id="reviews.form"
      data-semtag-role="region"
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label>Your Rating *</Label>
        <div
          data-semtag-id="reviews.form.rating"
          data-semtag-role="collection"
          className="flex gap-1"
        >
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              data-semtag-id={`reviews.form.rating.item.star-${star}`}
              data-semtag-role="option"
              data-semtag-state={star <= rating ? 'selected' : undefined}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  'h-7 w-7 transition-colors',
                  star <= (hoverRating || rating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reviewer-name">Your Name *</Label>
          <Input
            id="reviewer-name"
            data-semtag-id="reviews.form.name"
            data-semtag-role="input"
            data-semtag-state="review.guestName"
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="visit-date">Date of Visit *</Label>
          <Input
            id="visit-date"
            data-semtag-id="reviews.form.visit-date"
            data-semtag-role="input"
            data-semtag-state="review.visitDate"
            type="date"
            value={visitDate}
            onChange={e => setVisitDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Your Review *</Label>
        <Textarea
          id="comment"
          data-semtag-id="reviews.form.comment"
          data-semtag-role="input"
          data-semtag-state="review.comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Share your dining experience..."
          rows={4}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        data-semtag-id="reviews.form.submit"
        data-semtag-role="action"
        data-semtag-action="submit-review"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
