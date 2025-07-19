"use client";
import { useUserStore } from "@/store/user";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { PAGES, PUBLIC_ROUTES } from "@/utils/constant";
import LoaderSkeleton from "@/components/LoaderSkeleton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useUserStore((s) => s.isAuthenticated);
    const loading = useUserStore((s) => s.loading);
    const fetchUser = useUserStore((s) => s.loadUserDetails);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) {
            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        if (!loading && isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
            router.replace("/" + PAGES.DASHBOARD);
        }
    }, [isAuthenticated, loading, pathname, router]);

    if (loading || isAuthenticated) return <LoaderSkeleton />;

    return <>{children}</>;
}
