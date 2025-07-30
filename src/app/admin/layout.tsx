import { AuthProvider } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="bg-background text-foreground min-h-screen">
        {children}
      </div>
      <Toaster />
    </AuthProvider>
  );
}
