'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { signup } from '@/app/(auth)/actions';
import Link from 'next/link';

export default function SignupPage() {
  async function clientAction(formData: FormData) {
    const errorResponse = await signup(formData);
    if (errorResponse?.error) {
      toast.error(errorResponse.error);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-black/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-8">Join FreshCart today.</p>

        <form action={clientAction} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input required name="full_name" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input required type="email" name="email" placeholder="customer@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input required type="password" name="password" placeholder="••••••••" />
          </div>
          <Button type="submit" size="lg" className="w-full text-lg shadow-md bg-gray-900 hover:bg-gray-800">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
