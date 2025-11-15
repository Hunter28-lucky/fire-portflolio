'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectCms from '@/components/project-cms';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, Loader2 } from 'lucide-react';

const authorizedAdminEmails = ['krrishyogi18@gmail.com'];

export default function AdminPage() {
  const { isAuthenticated, login, user, loading, logout } = useAuth(); // Added logout here

  const handleLogin = async () => {
    await login();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated && user && authorizedAdminEmails.includes(user.email || '')) {
    return <ProjectCms />;
  }
  
  if (isAuthenticated && user && !authorizedAdminEmails.includes(user.email || '')) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 gap-4">
        <h1 className="text-2xl font-headline">Unauthorized</h1>
        <p className="text-muted-foreground">You are not authorized to view this page.</p>
        <Button onClick={logout} variant="secondary">Logout</Button> {/* Added logout button */}
      </div>
    )
  }

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
