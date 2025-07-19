
import Header from "@/components/Header";
import ProtectedLayout from "@/components/ProtectedRoute";

export default function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>
    <Header />
    {children}</ProtectedLayout>
}
