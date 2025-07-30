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
import { LogOut, PlusCircle } from 'lucide-react';
import { getProjects, addProject, updateProject, deleteProject } from '@/services/project-service';
import { useToast } from '@/hooks/use-toast';

export default function ProjectCms() {
  const { logout, user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const dbProjects = await getProjects();
        setProjects(dbProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast({
          title: "Error",
          description: "Could not load projects from the database.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [toast]);

  const handleProjectChange = async (id: string, field: keyof Omit<Project, 'id'>, value: string | string[]) => {
    const updatedProjects = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(updatedProjects);
    
    const projectToUpdate = updatedProjects.find(p => p.id === id);
    if (projectToUpdate) {
      // Debounce or save on blur in a real app, but for simplicity, we save immediately.
      try {
        await updateProject(id, projectToUpdate);
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
      <div className="container mx-auto py-8 text-center">
        <p>Loading projects...</p>
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
                  onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`link-${project.id}`}>Link</Label>
                <Input
                  id={`link-${project.id}`}
                  value={project.link}
                  onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                />
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor={`description-${project.id}`}>Description</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`imageUrl-${project.id}`}>Image URL</Label>
                <Input
                  id={`imageUrl-${project.id}`}
                  value={project.imageUrl}
                  onChange={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor={`aiHint-${project.id}`}>AI Hint</Label>
                <Input
                  id={`aiHint-${project.id}`}
                  value={project.aiHint}
                  onChange={(e) => handleProjectChange(project.id, 'aiHint', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`tags-${project.id}`}>Tags (comma-separated)</Label>
                <Input
                  id={`tags-${project.id}`}
                  value={project.tags.join(',')}
                  onChange={(e) => handleProjectChange(project.id, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
