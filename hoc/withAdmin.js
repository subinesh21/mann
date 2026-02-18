'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function withAdmin(WrappedComponent) {
  return function AdminComponent(props) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/account');
        } else if (user?.role !== 'admin') {
          router.push('/');
        }
      }
    }, [isAuthenticated, user, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying admin access...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated || user?.role !== 'admin') {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}