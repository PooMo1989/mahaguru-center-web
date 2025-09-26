"use client";

import { useSearchParams } from 'next/navigation';
import BookingWidget from '~/components/booking/BookingWidget';
import { Suspense } from 'react';
import { Navigation, Footer } from '~/components/navigation';

const serviceIdMap: Record<string, string> = {
  '5,000': '3',
  '25,000': '9',
  '50,000': '10',
  '100,000': '11',
  '250,000': '12',
  '500,000': '14',
  '1,000,000': '13',
  'free': '15',
};

function BookCalendarContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const serviceId = amount ? serviceIdMap[amount] : null;

  return (
    <main className="min-h-screen">
      {serviceId ? (
        <BookingWidget serviceId={serviceId} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl text-gray-600">Invalid selection. Please go back and choose a price.</p>
        </div>
      )}
    </main>
  );
}

export default function BookCalendarPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Navigation />
      <BookCalendarContent />
      <Footer />
    </Suspense>
  );
}
