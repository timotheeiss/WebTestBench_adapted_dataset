import { Star } from 'lucide-react';
import { Review } from '@/data/restaurants';
import { format, parseISO } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b border-border pb-6 last:border-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-semibold text-primary">
            {review.guestName.charAt(0)}
          </div>
          <div>
            <p
              data-semtag-id={`reviews.list.item.${review.id}`}
              data-semtag-role="observable"
              data-semtag-state="review.guestName"
              className="font-medium"
            >
              {review.guestName}
            </p>
            <p
              data-semtag-id={`reviews.list.item.${review.id}.visit-date`}
              data-semtag-role="observable"
              data-semtag-state="review.visitDate"
              className="text-sm text-muted-foreground"
            >
              Visited {format(parseISO(review.visitDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <div
          data-semtag-id={`reviews.list.item.${review.id}.rating`}
          data-semtag-role="observable"
          data-semtag-state={`rating-${review.rating}-of-5`}
          className="flex items-center gap-1"
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? 'fill-primary text-primary'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>
      </div>
      <p
        data-semtag-id={`reviews.list.item.${review.id}.comment`}
        data-semtag-role="observable"
        data-semtag-state="review.comment"
        className="mt-3 text-muted-foreground leading-relaxed"
      >
        {review.comment}
      </p>
    </div>
  );
}
