'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoaderSkeleton from '@/components/LoaderSkeleton';
import { useUserStore } from '@/store/user';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const loading = useUserStore((s) => s.loading);
  const fetchUser = useUserStore((s) => s.loadUserDetails);

  useEffect(() => {
    if (loading) fetchUser();
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated === false) {
      router.replace('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || isAuthenticated === false) return <LoaderSkeleton />;

  return <>{children}</>;
}
