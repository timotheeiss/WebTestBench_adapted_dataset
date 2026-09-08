import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, DollarSign, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { ReservationForm } from '@/components/ReservationForm';
import { ReviewCard } from '@/components/ReviewCard';
import { ReviewForm } from '@/components/ReviewForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { restaurants } from '@/data/restaurants';
import { useReservations } from '@/context/ReservationContext';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find(r => r.id === id);
  const { getReviewsByRestaurant } = useReservations();
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1
            data-semtag-id="restaurant.notfound"
            data-semtag-role="observable"
            className="text-2xl font-display font-semibold"
          >
            Restaurant not found
          </h1>
          <Link
            to="/"
            data-semtag-id="restaurant.notfound.back"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
            className="text-primary hover:underline mt-4 inline-block"
          >
            ← Back to restaurants
          </Link>
        </div>
      </div>
    );
  }

  const reviews = getReviewsByRestaurant(restaurant.id);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : restaurant.rating;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <Link
          to="/"
          data-semtag-id="restaurant.back"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
          className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/80 backdrop-blur px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Restaurant Info */}
            <div
              data-semtag-id="restaurant.info"
              data-semtag-role="region"
              className="bg-card rounded-xl border p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1
                    data-semtag-id="restaurant.name"
                    data-semtag-role="observable"
                    data-semtag-state="restaurant.name"
                    className="font-display text-3xl md:text-4xl font-bold"
                  >
                    {restaurant.name}
                  </h1>
                  <p
                    data-semtag-id="restaurant.cuisine"
                    data-semtag-role="observable"
                    data-semtag-state="restaurant.cuisine"
                    className="mt-2 text-lg text-muted-foreground"
                  >
                    {restaurant.cuisine}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-accent px-4 py-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span
                    data-semtag-id="restaurant.rating"
                    data-semtag-role="observable"
                    data-semtag-state="restaurant.rating"
                    className="text-lg font-semibold"
                  >
                    {avgRating}
                  </span>
                  <span
                    data-semtag-id="restaurant.review-count"
                    data-semtag-role="observable"
                    data-semtag-state="restaurant.reviewCount"
                    className="text-muted-foreground"
                  >
                    ({reviews.length || restaurant.reviewCount})
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span
                    data-semtag-id="restaurant.address"
                    data-semtag-role="observable"
                    data-semtag-state="restaurant.address"
                  >
                    {restaurant.address}, {restaurant.neighborhood}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span
                    data-semtag-id="restaurant.price"
                    data-semtag-role="observable"
                    data-semtag-state="restaurant.priceRange"
                  >
                    {restaurant.priceRange}
                  </span>
                </div>
              </div>

              <p
                data-semtag-id="restaurant.description"
                data-semtag-role="observable"
                data-semtag-state="restaurant.description"
                className="mt-6 text-muted-foreground leading-relaxed"
              >
                {restaurant.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {restaurant.features.map(feature => (
                  <span
                    key={feature}
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-card rounded-xl border p-6 md:p-8">
              <Tabs defaultValue="reviews" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="reviews"
                    data-semtag-id="reviews.tab.list"
                    data-semtag-role="action"
                    data-semtag-action="show-reviews"
                    data-semtag-controls="reviews.list"
                  >
                    Reviews ({reviews.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="write"
                    data-semtag-id="reviews.tab.write"
                    data-semtag-role="action"
                    data-semtag-action="show-review-form"
                    data-semtag-controls="reviews.form"
                  >
                    Write a Review
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="reviews"
                  data-semtag-id="reviews.list"
                  data-semtag-role="collection"
                  className="space-y-6"
                >
                  {reviews.length === 0 ? (
                    <p
                      data-semtag-id="reviews.empty"
                      data-semtag-role="observable"
                      data-semtag-state="reviews.count"
                      className="text-muted-foreground text-center py-8"
                    >
                      No reviews yet. Be the first to share your experience!
                    </p>
                  ) : (
                    reviews.map(review => (
                      <ReviewCard key={review.id} review={review} />
                    ))
                  )}
                </TabsContent>
                <TabsContent value="write">
                  <ReviewForm restaurantId={restaurant.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Reservation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-20">
              {showConfirmation ? (
                <div
                  data-semtag-id="reservation.confirmation"
                  data-semtag-role="region"
                  className="text-center py-8 animate-fade-in"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3
                    data-semtag-id="reservation.confirmation.message"
                    data-semtag-role="observable"
                    data-semtag-state="reservation.status"
                    className="font-display text-xl font-semibold mb-2"
                  >
                    Reservation Confirmed!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Check your email for confirmation details.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link to="/reservations">
                      <Button
                        className="w-full"
                        data-semtag-id="reservation.confirmation.view-reservations"
                        data-semtag-role="navigation"
                        data-semtag-target="reservations.page"
                      >
                        View My Reservations
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmation(false)}
                      data-semtag-id="reservation.confirmation.reset"
                      data-semtag-role="action"
                      data-semtag-action="start-new-reservation"
                      data-semtag-controls="reservation.form"
                    >
                      Make Another Reservation
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-semibold mb-6">
                    Make a Reservation
                  </h2>
                  <ReservationForm
                    restaurant={restaurant}
                    onSuccess={() => setShowConfirmation(true)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for footer */}
      <div className="h-16" />
    </div>
  );
};

export default RestaurantDetail;
