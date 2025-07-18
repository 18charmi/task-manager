'use client';

import { useEffect, useState, type FC, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PAGES } from '@/utils/constant';
import LoaderSkeleton from '@/components/LoaderSkeleton';
// import { useStore } from '@/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isPublicPage = [PAGES.LOGIN, PAGES.REGISTER].includes(pathname.slice(1));

  useEffect(() => {
    // Simulated auth check (replace with actual auth check)
    const checkAuth = async () => {
      await new Promise((res) => setTimeout(res, 2000)); // Simulate delay
      setIsAuthenticated(false); // replace with real check result
      setLoading(false);
    };

    checkAuth();
    // loadUserFromCookies(); // If using Zustand or any global store
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated && !isPublicPage) {
      router.push(PAGES.LOGIN);
    } else if (isAuthenticated && isPublicPage) {
      router.push(PAGES.DASHBOARD);
    }
  }, [loading, isAuthenticated, isPublicPage, router]);

  const isPageAllowed = isAuthenticated ? !isPublicPage : isPublicPage;

  if (loading || !isPageAllowed) {
    return <LoaderSkeleton />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
