import { Store } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Store className="h-6 w-6" />
            <span>FreshCart</span>
          </div>
          <p className="text-gray-500 text-sm">
            Your one-stop shop for fresh vegetables, fruits, cakes, and delicious biscuits.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Shop Categories</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Vegetables</li>
            <li>Fruits</li>
            <li>Cakes</li>
            <li>Biscuits</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Customer Service</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Contact Us</li>
            <li>Shipping Policy</li>
            <li>Returns & Exchanges</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} FreshCart Mock Application. All rights reserved.
      </div>
    </footer>
  );
}
