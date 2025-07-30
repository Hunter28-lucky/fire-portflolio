'use client';

import { useState } from 'react';
import { projects as initialProjects } from '@/data/projects';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';

export default function ProjectCms() {
  const { logout, user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleProjectChange = (id: string, field: keyof Project, value: string | string[]) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addProject = () => {
    const newProject: Project = {
      id: (projects.length + 1).toString(),
      title: 'New Project',
      description: 'A new awesome project.',
      imageUrl: 'https://placehold.co/600x400',
      tags: ['Web'],
      link: '#',
      aiHint: 'new project'
    };
    setProjects([...projects, newProject]);
  };
  
  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const generateCode = () => {
    const code = `import type { Project } from '@/types';

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

// This data is no longer used by the simplified portfolio section.
export const projectPerformanceMetrics: string[] = [];
`;
    setGeneratedCode(code);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copied to clipboard!');
  };

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
        <Button onClick={logout} variant="secondary">
          <LogOut className="mr-2" /> Logout
        </Button>
      </div>

      <div className="space-y-8">
        {projects.map(project => (
          <Card key={project.id} className="glass-panel">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{project.title}</CardTitle>
                    <Button onClick={() => removeProject(project.id)} variant="destructive" size="sm" className="w-fit">Remove</Button>
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
                  onChange={(e) => handleProjectChange(project.id, 'tags', e.target.value.split(','))}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        <Button onClick={addProject}>Add New Project</Button>
      </div>
      
      <div className="mt-12">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Generate Updated Code</CardTitle>
            <CardDescription>
              Click the button to generate the code for your updated projects. Copy this code and replace the content of <code className="bg-muted px-1 py-0.5 rounded">src/data/projects.ts</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={generateCode}>Generate Code</Button>
            {generatedCode && (
              <div className="mt-4">
                <Textarea readOnly value={generatedCode} rows={15} className="font-code"/>
                <Button onClick={copyToClipboard} className="mt-2">Copy to Clipboard</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
