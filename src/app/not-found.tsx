import Link from 'next/link';
import { Navigation, Footer } from "~/components/navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="bg-[#183F37] hover:bg-[#152F2E] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}