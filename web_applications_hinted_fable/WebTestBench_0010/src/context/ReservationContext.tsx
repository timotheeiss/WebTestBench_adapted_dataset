import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Reservation, Review, initialReviews } from '@/data/restaurants';

interface ReservationContextType {
  reservations: Reservation[];
  reviews: Review[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  cancelReservation: (id: string) => void;
  getReservationsByRestaurant: (restaurantId: string) => Reservation[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsByRestaurant: (restaurantId: string) => Review[];
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const RESERVATIONS_KEY = 'tablespot_reservations';
const REVIEWS_KEY = 'tablespot_reviews';

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const stored = localStorage.getItem(RESERVATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem(REVIEWS_KEY);
    return stored ? JSON.parse(stored) : initialReviews;
  });

  useEffect(() => {
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
    const newReservation: Reservation = {
      ...reservation,
      id: `res_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    setReservations(prev => [...prev, newReservation]);
    return newReservation;
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations(prev =>
      prev.map(res => (res.id === id ? { ...res, ...updates } : res))
    );
  };

  const cancelReservation = (id: string) => {
    setReservations(prev =>
      prev.map(res => (res.id === id ? { ...res, status: 'cancelled' as const } : res))
    );
  };

  const getReservationsByRestaurant = (restaurantId: string) => {
    return reservations.filter(res => res.restaurantId === restaurantId);
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getReviewsByRestaurant = (restaurantId: string) => {
    return reviews.filter(rev => rev.restaurantId === restaurantId);
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        reviews,
        addReservation,
        updateReservation,
        cancelReservation,
        getReservationsByRestaurant,
        addReview,
        getReviewsByRestaurant,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
}
