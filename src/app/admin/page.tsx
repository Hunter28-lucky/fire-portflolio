'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import ProjectCms from '@/components/project-cms';

export default function AdminPage() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      // User is already authenticated, maybe redirect them to a dashboard
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    login();
    // Redirect to a protected dashboard page after login if needed
    // router.push('/admin/dashboard');
  };

  if (isAuthenticated) {
    return <ProjectCms />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-sm glass-panel">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
          <CardDescription>Click the button to log in as an administrator.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} className="w-full" variant="secondary">
            Login as Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}