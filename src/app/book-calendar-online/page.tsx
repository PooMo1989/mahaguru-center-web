"use client";

import { useSearchParams } from 'next/navigation';
import BookingWidgetOnline from '~/components/booking/BookingWidgetOnline';
import { Suspense } from 'react';
import { Navigation, Footer } from '~/components/navigation';

const serviceIdMap: { [key: string]: string } = {
  '10,000': '4',
  '25,000': '16',
  '50,000': '17',
  '100,000': '18',
  '250,000': '19',
  '500,000': '20',
  '1,000,000': '21',
  'free': '22',
};

function BookCalendarOnlineContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const serviceId = amount ? serviceIdMap[amount] : null;

  return (
    <main className="min-h-screen">
      {serviceId ? (
        <BookingWidgetOnline serviceId={serviceId} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl text-gray-600">Invalid selection. Please go back and choose a price.</p>
        </div>
      )}
    </main>
  );
}

export default function BookCalendarOnlinePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Navigation />
      <BookCalendarOnlineContent />
      <Footer />
    </Suspense>
  );
}