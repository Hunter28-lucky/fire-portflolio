'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import ProjectCms from '@/components/project-cms';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn } from 'lucide-react';

// Replace with your actual authorized admin emails
const authorizedAdminEmails = ['krrishyogi18@gmail.com'];

export default function AdminPage() {
  const { isAuthenticated, login, user } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    await login();
  };
  
  // Check if the user is authenticated AND if their email is in the authorized list
  if (isAuthenticated && user && authorizedAdminEmails.includes(user.email || '')) {
    return <ProjectCms />;
  }

  // If not authenticated or not authorized, show the login page
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-sm glass-panel">
        <CardHeader className="text-center items-center gap-4">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
          <CardDescription>Log in with your Google account to manage your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} className="w-full" variant="secondary">
            <LogIn className="mr-2" /> Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
'