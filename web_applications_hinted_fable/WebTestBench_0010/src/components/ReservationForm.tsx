import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar, Clock, Users, Tag, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Restaurant, coupons } from '@/data/restaurants';
import { useReservations } from '@/context/ReservationContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ReservationFormProps {
  restaurant: Restaurant;
  onSuccess?: () => void;
}

export function ReservationForm({ restaurant, onSuccess }: ReservationFormProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addReservation } = useReservations();
  const { toast } = useToast();

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      if (coupon.minPartySize && parseInt(partySize) < coupon.minPartySize) {
        toast({
          title: 'Coupon Not Applicable',
          description: `This coupon requires a party of ${coupon.minPartySize} or more.`,
          variant: 'destructive',
        });
        return;
      }
      setAppliedCoupon(coupon);
      toast({
        title: 'Coupon Applied!',
        description: coupon.description,
      });
    } else {
      toast({
        title: 'Invalid Coupon',
        description: 'The coupon code you entered is not valid.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !guestName || !guestEmail || !guestPhone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    addReservation({
      restaurantId: restaurant.id,
      date: format(date, 'yyyy-MM-dd'),
      time,
      partySize: parseInt(partySize),
      guestName,
      guestEmail,
      guestPhone,
      specialRequests: specialRequests || undefined,
      couponCode: appliedCoupon?.code,
    });

    toast({
      title: 'Reservation Confirmed!',
      description: `Your table at ${restaurant.name} is booked for ${format(date, 'MMMM d, yyyy')} at ${time}.`,
    });

    setIsSubmitting(false);
    onSuccess?.();
  };

  const minDate = new Date();
  const maxDate = addDays(new Date(), 60);

  return (
    <form
      onSubmit={handleSubmit}
      data-semtag-id="reservation.form"
      data-semtag-role="region"
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-semtag-id="reservation.date"
                data-semtag-role="select"
                data-semtag-state="reservation.date"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                {date ? format(date, 'MMM d, yyyy') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < minDate || date > maxDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Time
          </Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger
              data-semtag-id="reservation.time"
              data-semtag-role="select"
              data-semtag-state="reservation.time"
              data-semtag-options={restaurant.availableTimes.join(';')}
            >
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {restaurant.availableTimes.map(t => (
                <SelectItem
                  key={t}
                  value={t}
                  data-semtag-id={`reservation.time.option.${t.replace(':', '')}`}
                  data-semtag-role="option"
                >
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Party Size
          </Label>
          <Select value={partySize} onValueChange={setPartySize}>
            <SelectTrigger
              data-semtag-id="reservation.party-size"
              data-semtag-role="select"
              data-semtag-state="reservation.partySize"
              data-semtag-options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                .map(size => `${size}|${size} ${size === 1 ? 'Guest' : 'Guests'}`)
                .join(';')}
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                <SelectItem
                  key={size}
                  value={size.toString()}
                  data-semtag-id={`reservation.party-size.option.${size}`}
                  data-semtag-role="option"
                >
                  {size} {size === 1 ? 'Guest' : 'Guests'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            data-semtag-id="reservation.guest-name"
            data-semtag-role="input"
            data-semtag-state="reservation.guestName"
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            data-semtag-id="reservation.guest-email"
            data-semtag-role="input"
            data-semtag-state="reservation.guestEmail"
            type="email"
            value={guestEmail}
            onChange={e => setGuestEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          data-semtag-id="reservation.guest-phone"
          data-semtag-role="input"
          data-semtag-state="reservation.guestPhone"
          type="tel"
          value={guestPhone}
          onChange={e => setGuestPhone(e.target.value)}
          placeholder="+1 (555) 000-0000"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requests">Special Requests</Label>
        <Textarea
          id="requests"
          data-semtag-id="reservation.special-requests"
          data-semtag-role="input"
          data-semtag-state="reservation.specialRequests"
          value={specialRequests}
          onChange={e => setSpecialRequests(e.target.value)}
          placeholder="Allergies, celebrations, seating preferences..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          Discount Coupon
        </Label>
        {appliedCoupon ? (
          <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span
                data-semtag-id="reservation.coupon.applied"
                data-semtag-role="observable"
                data-semtag-state="reservation.couponCode"
                className="text-sm font-medium"
              >
                {appliedCoupon.code}
              </span>
              <span
                data-semtag-id="reservation.coupon.discount"
                data-semtag-role="observable"
                data-semtag-state="reservation.couponDiscount"
                className="text-sm text-muted-foreground"
              >
                - {appliedCoupon.discount}% off
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              data-semtag-id="reservation.coupon.remove"
              data-semtag-role="action"
              data-semtag-action="remove-coupon"
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
              data-semtag-id="reservation.coupon.code"
              data-semtag-role="input"
              data-semtag-state="reservation.couponCode"
              placeholder="Enter coupon code"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleApplyCoupon}
              data-semtag-id="reservation.coupon.apply"
              data-semtag-role="action"
              data-semtag-action="apply-coupon"
            >
              Apply
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Try: WELCOME10, GROUP15 (6+ guests), WEEKEND20
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
        data-semtag-id="reservation.submit"
        data-semtag-role="action"
        data-semtag-action="submit-reservation"
      >
        {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
      </Button>
    </form>
  );
}
