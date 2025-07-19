'use client';

import ProtectedLayout from "@/components/ProtectedRoute";

export default function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>
}
