import { useState } from 'react';
import { format, parseISO, isPast } from 'date-fns';
import { Calendar, Clock, Users, MapPin, Edit2, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Reservation, restaurants } from '@/data/restaurants';
import { useReservations } from '@/context/ReservationContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const restaurant = restaurants.find(r => r.id === reservation.restaurantId);
  const { updateReservation, cancelReservation } = useReservations();
  const { toast } = useToast();
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [newTime, setNewTime] = useState(reservation.time);
  const [newPartySize, setNewPartySize] = useState(reservation.partySize.toString());

  if (!restaurant) return null;

  const semtagId = `reservations.item.${reservation.id}`;
  const reservationDate = parseISO(reservation.date);
  const isUpcoming = !isPast(reservationDate) && reservation.status !== 'cancelled';
  const isCancelled = reservation.status === 'cancelled';

  const handleModify = () => {
    updateReservation(reservation.id, {
      time: newTime,
      partySize: parseInt(newPartySize),
    });
    toast({
      title: 'Reservation Updated',
      description: 'Your reservation has been modified successfully.',
    });
    setIsModifyOpen(false);
  };

  const handleCancel = () => {
    cancelReservation(reservation.id);
    toast({
      title: 'Reservation Cancelled',
      description: 'Your reservation has been cancelled.',
    });
  };

  return (
    <div
      className={cn(
        'rounded-xl border bg-card overflow-hidden transition-all',
        isCancelled && 'opacity-60'
      )}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-32 sm:h-auto">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                data-semtag-id={semtagId}
                data-semtag-role="observable"
                data-semtag-state="reservation.restaurantName"
                className="font-display text-lg font-semibold"
              >
                {restaurant.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {restaurant.cuisine} · {restaurant.priceRange}
              </p>
            </div>
            <span
              data-semtag-id={`${semtagId}.status`}
              data-semtag-role="observable"
              data-semtag-state="reservation.status"
              className={cn(
                'text-xs font-medium px-2.5 py-1 rounded-full',
                isCancelled
                  ? 'bg-destructive/10 text-destructive'
                  : isUpcoming
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {isCancelled ? 'Cancelled' : isUpcoming ? 'Upcoming' : 'Completed'}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span
                data-semtag-id={`${semtagId}.date`}
                data-semtag-role="observable"
                data-semtag-state="reservation.date"
              >
                {format(reservationDate, 'MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span
                data-semtag-id={`${semtagId}.time`}
                data-semtag-role="observable"
                data-semtag-state="reservation.time"
              >
                {reservation.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span
                data-semtag-id={`${semtagId}.party-size`}
                data-semtag-role="observable"
                data-semtag-state="reservation.partySize"
              >
                {reservation.partySize} {reservation.partySize === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.neighborhood}</span>
            </div>
          </div>

          {reservation.couponCode && (
            <div className="mt-3 flex items-center gap-2 text-sm text-primary">
              <Tag className="h-4 w-4" />
              <span
                data-semtag-id={`${semtagId}.coupon`}
                data-semtag-role="observable"
                data-semtag-state="reservation.couponCode"
              >
                Coupon applied: {reservation.couponCode}
              </span>
            </div>
          )}

          {isUpcoming && !isCancelled && (
            <div className="mt-4 flex gap-2">
              <Dialog open={isModifyOpen} onOpenChange={setIsModifyOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    data-semtag-id={`${semtagId}.modify`}
                    data-semtag-role="action"
                    data-semtag-action="open-modify-dialog"
                    data-semtag-controls={`${semtagId}.modify.dialog`}
                  >
                    <Edit2 className="h-4 w-4 mr-1.5" />
                    Modify
                  </Button>
                </DialogTrigger>
                <DialogContent
                  data-semtag-id={`${semtagId}.modify.dialog`}
                  data-semtag-role="region"
                >
                  <DialogHeader>
                    <DialogTitle>Modify Reservation</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>New Time</Label>
                      <Select value={newTime} onValueChange={setNewTime}>
                        <SelectTrigger
                          data-semtag-id={`${semtagId}.modify.time`}
                          data-semtag-role="select"
                          data-semtag-state="reservation.time"
                          data-semtag-options={restaurant.availableTimes.join(';')}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {restaurant.availableTimes.map(t => (
                            <SelectItem
                              key={t}
                              value={t}
                              data-semtag-id={`${semtagId}.modify.time.option.${t.replace(':', '')}`}
                              data-semtag-role="option"
                            >
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Party Size</Label>
                      <Select value={newPartySize} onValueChange={setNewPartySize}>
                        <SelectTrigger
                          data-semtag-id={`${semtagId}.modify.party-size`}
                          data-semtag-role="select"
                          data-semtag-state="reservation.partySize"
                          data-semtag-options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                            .map(size => `${size}|${size} ${size === 1 ? 'Guest' : 'Guests'}`)
                            .join(';')}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                            <SelectItem
                              key={size}
                              value={size.toString()}
                              data-semtag-id={`${semtagId}.modify.party-size.option.${size}`}
                              data-semtag-role="option"
                            >
                              {size} {size === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleModify}
                      className="w-full"
                      data-semtag-id={`${semtagId}.modify.save`}
                      data-semtag-role="action"
                      data-semtag-action="save-reservation-changes"
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    data-semtag-id={`${semtagId}.cancel`}
                    data-semtag-role="action"
                    data-semtag-action="open-cancel-dialog"
                    data-semtag-controls={`${semtagId}.cancel.dialog`}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1.5" />
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                  data-semtag-id={`${semtagId}.cancel.dialog`}
                  data-semtag-role="region"
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Reservation?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Your reservation at {restaurant.name} will be cancelled.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      data-semtag-id={`${semtagId}.cancel.keep`}
                      data-semtag-role="action"
                      data-semtag-action="keep-reservation"
                    >
                      Keep Reservation
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancel}
                      data-semtag-id={`${semtagId}.cancel.confirm`}
                      data-semtag-role="action"
                      data-semtag-action="cancel-reservation"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Cancel Reservation
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
