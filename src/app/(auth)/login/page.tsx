'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { login } from '@/app/(auth)/actions';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  useEffect(() => {
    if (message) {
      toast.info(message);
    }
  }, [message]);

  async function clientAction(formData: FormData) {
    const errorResponse = await login(formData);
    if (errorResponse?.error) {
      toast.error(errorResponse.error);
    } else {
      toast.success("Successfully logged in!");
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-black/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Sign in to your Customer or Admin account</p>

        <form action={clientAction} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input type="email" name="email" required placeholder="customer@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input type="password" name="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" size="lg" className="w-full text-lg shadow-md bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
