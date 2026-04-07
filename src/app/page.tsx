import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, HeartPulse } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-24 pb-32">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-r from-blue-100 to-indigo-50 opacity-50 blur-3xl transform -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 px-4 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-default shadow-sm border-none">
            Welcome to the future of grocery
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 drop-shadow-sm">
            Fresh Groceries, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Delivered to You
            </span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
            Experience the finest selection of organic vegetables, seasonal fruits, 
            artisan cakes, and delightful biscuits. All guaranteed fresh and delicious.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/home">
              <Button size="lg" className="h-14 px-8 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-blue-600 hover:bg-blue-700">
                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-medium rounded-full border-2 hover:bg-gray-50 transition-all duration-300">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose FreshCart?</h2>
            <p className="text-gray-500 text-lg">We pride ourselves on quality and convenience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<HeartPulse className="h-8 w-8 text-rose-500" />}
              title="Farm Fresh Quality"
              description="We source directly from local farms. Only the freshest organic produce makes it to your door."
            />
            <FeatureCard 
              icon={<Truck className="h-8 w-8 text-blue-500" />}
              title="Fast & Free Delivery"
              description="Get your groceries delivered to your doorstep within hours. Free for orders over $50."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-emerald-500" />}
              title="Secure Checkout"
              description="Your transactions are fully encrypted and secure. We offer a 100% satisfaction guarantee."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
      <div className="mb-6 p-4 bg-white rounded-full shadow-sm group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

// Inline Badge component for Landing page ease
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
