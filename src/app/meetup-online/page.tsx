"use client";

import { Navigation, Footer } from "~/components/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MeetupOnlinePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const priceOptions = [
    { amount: "10,000" },
    { amount: "25,000" },
    { amount: "50,000" },
    { amount: "100,000" },
    { amount: "250,000" },
    { amount: "500,000" },
    { amount: "1,000,000" },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating wisdom particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Interactive light following mouse */}
            <div
              className="absolute w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl transition-all duration-1000"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>

          <div className={`text-center max-w-4xl transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Animated Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Book
                </span>{' '}
                <span className="inline-block animate-fade-in-up bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ animationDelay: '0.4s' }}>
                  Online
                </span>{' '}
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  Meetup
                </span>
              </h1>
            </div>

            {/* Wisdom Content */}
            <div className={`mb-12 transition-all duration-1500 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed font-light">
                We don't price wisdom. We can't.
              </p>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Your time is valuable—you know this. In the right moment, with the right guide, 
                an hour becomes priceless. You choose what this deep conversation with Mahaguru is worth to you.
              </p>
            </div>

            {/* Animated Sacred Geometry */}
            <div className="flex justify-center mb-12">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 border border-pink-400/30 rounded-full animate-spin-reverse"></div>
                <div className="absolute inset-4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Selection Section */}
        <section className="relative py-12 md:py-20 px-4 md:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-8 md:mb-12 transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                Choose Your Contribution
              </h2>
            </div>

            {/* Price Grid - 2x4 on mobile, responsive on larger screens */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {priceOptions.map((option, index) => (
                <Link
                  key={option.amount}
                  href={`/book-calendar-online?amount=${option.amount}`}
                  className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg md:rounded-2xl p-3 md:p-6 hover:bg-white active:scale-95 md:hover:scale-105 transition-all duration-300 hover:border-purple-300 hover:shadow-xl touch-manipulation ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 to-pink-100/0 group-hover:from-purple-100/50 group-hover:to-pink-100/50 group-active:from-purple-100/30 group-active:to-pink-100/30 transition-all duration-300 rounded-lg md:rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-center">
                      <div className="mb-2 md:mb-4">
                        <div className="text-lg md:text-4xl lg:text-5xl font-bold text-gray-800 mb-1 md:mb-2">
                          {option.amount}
                        </div>
                        <div className="text-gray-500 text-xs md:text-sm font-medium">
                          LKR
                        </div>
                      </div>
                      
                      {/* Hover/Active effect indicator */}
                      <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 group-active:translate-y-0">
                        <div className="w-full py-1 md:py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white font-medium text-xs md:text-sm">
                          Select
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-lg md:rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-lg md:rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 p-[1px]">
                      <div className="w-full h-full rounded-lg md:rounded-2xl bg-white"></div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Free Session Card */}
              <Link
                href="/book-calendar-online?amount=free"
                className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg md:rounded-2xl p-3 md:p-6 hover:bg-white active:scale-95 md:hover:scale-105 transition-all duration-300 hover:border-green-300 hover:shadow-xl touch-manipulation ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${priceOptions.length * 0.05}s` }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-100/0 to-emerald-100/0 group-hover:from-green-100/50 group-hover:to-emerald-100/50 group-active:from-green-100/30 group-active:to-emerald-100/30 transition-all duration-300 rounded-lg md:rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="mb-2 md:mb-4">
                      <div className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 md:mb-2">
                        FREE
                      </div>
                      <div className="text-gray-600 text-xs md:text-sm font-medium leading-tight">
                        Free session
                      </div>
                    </div>
                    
                    {/* Hover/Active effect indicator */}
                    <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 group-active:translate-y-0">
                      <div className="w-full py-1 md:py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded text-white font-medium text-xs md:text-sm">
                        Request
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-lg md:rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-lg md:rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 p-[1px]">
                    <div className="w-full h-full rounded-lg md:rounded-2xl bg-white"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom Message */}
            <div className={`text-center mt-16 transition-all duration-1500 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-gray-600 text-lg italic max-w-2xl mx-auto">
                "The value of wisdom cannot be measured in currency, but your contribution 
                honors the sacred exchange of knowledge and supports our mission to guide others."
              </p>
              <div className="mt-6 text-purple-600 text-sm font-medium">
                — Mahaguru Center
              </div>
            </div>
          </div>
        </section>

        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full animate-float-slow"></div>
        </div>
      </main>
      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 4s;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </>
  );
}