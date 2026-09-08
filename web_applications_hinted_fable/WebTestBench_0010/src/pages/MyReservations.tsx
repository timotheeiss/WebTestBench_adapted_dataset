import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CalendarX, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { ReservationCard } from '@/components/ReservationCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReservations } from '@/context/ReservationContext';
import { parseISO, isPast } from 'date-fns';

const MyReservations = () => {
  const { reservations } = useReservations();

  const { upcoming, past } = useMemo(() => {
    const sorted = [...reservations].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      upcoming: sorted.filter(
        r => !isPast(parseISO(r.date)) && r.status !== 'cancelled'
      ),
      past: sorted.filter(
        r => isPast(parseISO(r.date)) || r.status === 'cancelled'
      ),
    };
  }, [reservations]);

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <CalendarX className="h-8 w-8 text-muted-foreground" />
      </div>
      <p
        data-semtag-id="reservations.empty"
        data-semtag-role="observable"
        data-semtag-state="reservations.count"
        className="text-muted-foreground mb-6"
      >
        {message}
      </p>
      <Link to="/">
        <Button
          data-semtag-id="reservations.empty.browse"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
        >
          Browse Restaurants
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            My Reservations
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage your upcoming and past dining experiences
          </p>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="upcoming"
                data-semtag-id="reservations.tab.upcoming"
                data-semtag-role="action"
                data-semtag-action="show-upcoming-reservations"
                data-semtag-controls="reservations.upcoming"
              >
                Upcoming ({upcoming.length})
              </TabsTrigger>
              <TabsTrigger
                value="past"
                data-semtag-id="reservations.tab.past"
                data-semtag-role="action"
                data-semtag-action="show-past-reservations"
                data-semtag-controls="reservations.past"
              >
                Past ({past.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="upcoming"
              data-semtag-id="reservations.upcoming"
              data-semtag-role="collection"
              className="space-y-4"
            >
              {upcoming.length === 0 ? (
                <EmptyState message="No upcoming reservations. Time to plan your next dining experience!" />
              ) : (
                upcoming.map((reservation, index) => (
                  <div
                    key={reservation.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ReservationCard reservation={reservation} />
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent
              value="past"
              data-semtag-id="reservations.past"
              data-semtag-role="collection"
              className="space-y-4"
            >
              {past.length === 0 ? (
                <EmptyState message="No past reservations yet." />
              ) : (
                past.map((reservation, index) => (
                  <div
                    key={reservation.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ReservationCard reservation={reservation} />
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
