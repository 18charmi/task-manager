'use client';

import { useEffect, type FC, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PAGES } from '@/utils/constant';
import LoaderSkeleton from '@/components/LoaderSkeleton';
import { useStore } from '@/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {

  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const loading = useStore((s) => s.loading);
  const loadUserDetails = useStore((s) => s.loadUserDetails);

  const router = useRouter();
  const pathname = usePathname();

  const isPublicPage = [PAGES.LOGIN, PAGES.REGISTER].includes(pathname.slice(1));

  useEffect(() => {
    loadUserDetails();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      if (!isPublicPage)
        router.push("/" + PAGES.LOGIN);
    } else {
      if (isPublicPage)
        router.push("/" + PAGES.DASHBOARD);
    }
  }, [loading, isAuthenticated]);

  const isPageAllowed = isAuthenticated ? !isPublicPage : isPublicPage;

  if (loading || !isPageAllowed) {
    return <LoaderSkeleton />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
