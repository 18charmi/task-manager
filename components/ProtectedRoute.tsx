'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoaderSkeleton from '@/components/LoaderSkeleton';
import { useUserStore } from '@/store/user';

const PUBLIC_ROUTES = ['/login', '/register'];

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const loading = useUserStore((s) => s.loading);
  const fetchUser = useUserStore((s) => s.loadUserDetails);

  // Only load user details on mount once
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  // Redirect if needed, runs when loading, auth, or path changes
  useEffect(() => {
    if (loading) return;

    // Not authenticated on a private route? Go to login
    if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace('/login');
      return;
    }

    // Authenticated but on a public route (login/register)? Go dashboard
    if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
      router.replace('/dashboard');
    }
  }, [loading, isAuthenticated, pathname, router]);

  if (loading) return <LoaderSkeleton />;

  return <>{children}</>;
}
