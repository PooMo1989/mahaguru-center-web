import Link from "next/link";
import { Navigation, Footer } from "~/components/navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="mb-8 text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-[#183F37] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#152F2E]"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
