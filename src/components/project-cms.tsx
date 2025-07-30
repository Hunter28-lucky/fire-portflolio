'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, PlusCircle, Loader2 } from 'lucide-react';
import { getProjects, addProject, updateProject, deleteProject } from '@/services/project-service';
import { useToast } from '@/hooks/use-toast';

export default function ProjectCms() {
  const { logout, user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const dbProjects = await getProjects();
        setProjects(dbProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast({
          title: "Error Loading Projects",
          description: "Could not load projects from the database. Please check your connection and try again.",
          variant: "destructive",
        });
        setProjects([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchProjects();
    }
  }, [toast, user]);

  const handleProjectChange = async (id: string, field: keyof Omit<Project, 'id'>, value: string | string[]) => {
    const updatedProjects = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(updatedProjects);
    
    const projectToUpdate = updatedProjects.find(p => p.id === id);
    if (projectToUpdate) {
      try {
        await updateProject(id, { [field]: value });
        toast({
          title: "Project Saved",
          description: `"${projectToUpdate.title}" has been updated.`,
        });
      } catch (error) {
        console.error("Failed to update project:", error);
        toast({
          title: "Error",
          description: "Failed to save project changes.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddNewProject = async () => {
    const newProject: Omit<Project, 'id'> = {
      title: 'New Project',
      description: 'A new awesome project.',
      imageUrl: 'https://placehold.co/600x400',
      tags: ['Web'],
      link: '#',
      aiHint: 'new project'
    };
    try {
      const addedProject = await addProject(newProject);
      setProjects(prevProjects => [...prevProjects, addedProject]);
      toast({
        title: "Project Added",
        description: "A new project has been created.",
      });
    } catch (error) {
      console.error("Failed to add project:", error);
       toast({
          title: "Error",
          description: "Could not add the new project.",
          variant: "destructive",
        });
    }
  };
  
  const handleRemoveProject = async (id: string) => {
    const projectToRemove = projects.find(p => p.id === id);
    if (!projectToRemove) return;

    if (!confirm(`Are you sure you want to delete "${projectToRemove.title}"?`)) {
      return;
    }

    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Project Removed",
        description: `"${projectToRemove.title}" has been deleted.`,
        variant: 'destructive'
      });
    } catch (error) {
       console.error("Failed to remove project:", error);
       toast({
          title: "Error",
          description: "Could not remove the project.",
          variant: "destructive",
        });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center text-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading projects from the mothership...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.photoURL ?? undefined} />
            <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-headline">Project CMS</h1>
            <p className="text-muted-foreground">Logged in as {user?.displayName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleAddNewProject} variant="outline">
            <PlusCircle className="mr-2" /> Add Project
          </Button>
          <Button onClick={logout} variant="secondary">
            <LogOut className="mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {projects.map(project => (
          <Card key={project.id} className="glass-panel">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{project.title}</CardTitle>
                    <Button onClick={() => handleRemoveProject(project.id)} variant="destructive" size="sm" className="w-fit">Remove</Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`title-${project.id}`}>Title</Label>
                <Input
                  id={`title-${project.id}`}
                  value={project.title}
                  onBlur={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, title: e.target.value} : p))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`link-${project.id}`}>Link</Label>
                <Input
                  id={`link-${project.id}`}
                  value={project.link}
                  onBlur={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, link: e.target.value} : p))}
                />
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor={`description-${project.id}`}>Description</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onBlur={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, description: e.target.value} : p))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`imageUrl-${project.id}`}>Image URL</Label>
                <Input
                  id={`imageUrl-${project.id}`}
                  value={project.imageUrl}
                  onBlur={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)}
                   onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, imageUrl: e.target.value} : p))}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor={`aiHint-${project.id}`}>AI Hint</Label>
                <Input
                  id={`aiHint-${project.id}`}
                  value={project.aiHint}
                  onBlur={(e) => handleProjectChange(project.id, 'aiHint', e.target.value)}
                   onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, aiHint: e.target.value} : p))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`tags-${project.id}`}>Tags (comma-separated)</Label>
                <Input
                  id={`tags-${project.id}`}
                  value={project.tags.join(',')}
                  onBlur={(e) => handleProjectChange(project.id, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                   onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, tags: e.target.value.split(',').map(tag => tag.trim())} : p))}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
