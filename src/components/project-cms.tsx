'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, PlusCircle, Loader2, Trash2, ExternalLink, Image as ImageIcon, Hash, Tag, ArrowUpDown, FolderOpen } from 'lucide-react';
import { getProjects, addProject, updateProject, deleteProject } from '@/services/project-service';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProjectCms() {
  const { logout, user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customCategory, setCustomCategory] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<Record<string, boolean>>({});
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
    const maxOrder = projects.reduce((max, p) => Math.max(max, p.order ?? 0), 0);
    const newProject: Omit<Project, 'id'> = {
      title: 'New Project',
      description: 'A new awesome project.',
      imageUrl: 'https://placehold.co/600x400',
      tags: ['Web'],
      link: '#',
      aiHint: 'new project',
      order: maxOrder + 1,
      category: 'Web Development'
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Loading your projects...</p>
        </div>
      </div>
    );
  }

  const predefinedCategories = [
    'Web Development',
    'E-commerce',
    'Games',
    'Mobile Apps',
    'AI/Automation',
    'VFX/Video',
    'Design',
    'API/Backend',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Modern Header */}
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <AvatarImage src={user?.photoURL ?? undefined} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                  {user?.displayName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-headline font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Project Manager
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome, {user?.displayName?.split(' ')[0]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                onClick={handleAddNewProject} 
                className="flex-1 sm:flex-initial bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="default"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> New Project
              </Button>
              <Button 
                onClick={logout} 
                variant="outline" 
                size="default" 
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total Projects</p>
                  <p className="text-3xl font-bold text-primary mt-1">{projects.length}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-accent/20 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Categories</p>
                  <p className="text-3xl font-bold text-accent mt-1">
                    {new Set(projects.map(p => p.category).filter(Boolean)).size}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Tag className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Status</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">All Systems Active</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="space-y-6">
          {projects.map(project => (
            <Card key={project.id} className="glass-panel hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Hash className="h-5 w-5 text-primary" />
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <Tag className="h-3 w-3" />
                      {project.category || 'Uncategorized'}
                      <span className="mx-2">•</span>
                      <span className="flex items-center gap-1">
                        <ArrowUpDown className="h-3 w-3" />
                        Order: {project.order ?? 0}
                      </span>
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => handleRemoveProject(project.id)} 
                    variant="destructive" 
                    size="sm" 
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor={`title-${project.id}`} className="flex items-center gap-2 text-sm font-medium">
                          <Hash className="h-4 w-4 text-primary" />
                          Project Title
                        </Label>
                        <Input
                          id={`title-${project.id}`}
                          value={project.title}
                          onBlur={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                          onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, title: e.target.value} : p))}
                          className="border-border/50 focus:border-primary transition-colors"
                          placeholder="My Awesome Project"
                        />
                      </div>

                      {/* Link */}
                      <div className="space-y-2">
                        <Label htmlFor={`link-${project.id}`} className="flex items-center gap-2 text-sm font-medium">
                          <ExternalLink className="h-4 w-4 text-primary" />
                          Project Link
                        </Label>
                        <Input
                          id={`link-${project.id}`}
                          value={project.link}
                          onBlur={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                          onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, link: e.target.value} : p))}
                          className="border-border/50 focus:border-primary transition-colors"
                          placeholder="https://example.com"
                        />
                      </div>

                      {/* Display Order */}
                      <div className="space-y-2">
                        <Label htmlFor={`order-${project.id}`} className="flex items-center gap-2 text-sm font-medium">
                          <ArrowUpDown className="h-4 w-4 text-primary" />
                          Display Order
                        </Label>
                        <Input
                          id={`order-${project.id}`}
                          type="number"
                          value={project.order ?? 0}
                          onBlur={(e) => handleProjectChange(project.id, 'order', parseInt(e.target.value) || 0)}
                          onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, order: parseInt(e.target.value) || 0} : p))}
                          className="border-border/50 focus:border-primary transition-colors"
                          placeholder="1"
                        />
                      </div>

                      {/* Category with Custom Input */}
                      <div className="space-y-2">
                        <Label htmlFor={`category-${project.id}`} className="flex items-center gap-2 text-sm font-medium">
                          <FolderOpen className="h-4 w-4 text-primary" />
                          Category
                        </Label>
                        {showCustomInput[project.id] ? (
                          <div className="flex gap-2">
                            <Input
                              value={project.category ?? ''}
                              onBlur={(e) => {
                                handleProjectChange(project.id, 'category', e.target.value);
                                setShowCustomInput({...showCustomInput, [project.id]: false});
                              }}
                              onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, category: e.target.value} : p))}
                              className="border-border/50 focus:border-primary transition-colors"
                              placeholder="Enter custom category"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowCustomInput({...showCustomInput, [project.id]: false})}
                            >
                              ✓
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <select
                              id={`category-${project.id}`}
                              value={predefinedCategories.includes(project.category ?? '') ? project.category : 'custom'}
                              onBlur={(e) => {
                                if (e.target.value !== 'custom') {
                                  handleProjectChange(project.id, 'category', e.target.value);
                                }
                              }}
                              onChange={(e) => {
                                if (e.target.value === 'custom') {
                                  setShowCustomInput({...showCustomInput, [project.id]: true});
                                } else {
                                  setProjects(projects.map(p => p.id === project.id ? {...p, category: e.target.value} : p));
                                }
                              }}
                              className="flex h-10 w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                            >
                              {predefinedCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                              <option value="custom">+ Custom Category</option>
                            </select>
                            {!predefinedCategories.includes(project.category ?? '') && project.category && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowCustomInput({...showCustomInput, [project.id]: true})}
                                title="Edit custom category"
                              >
                                ✏️
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor={`description-${project.id}`} className="text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id={`description-${project.id}`}
                        value={project.description}
                        onBlur={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                        onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, description: e.target.value} : p))}
                        className="border-border/50 focus:border-primary transition-colors min-h-[100px]"
                        placeholder="Describe your project..."
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Image URL */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`imageUrl-${project.id}`} className="flex items-center gap-2 text-sm font-medium">
                          <ImageIcon className="h-4 w-4 text-primary" />
                          Image URL
                        </Label>
                        <Input
                          id={`imageUrl-${project.id}`}
                          value={project.imageUrl}
                          onBlur={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)}
                          onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, imageUrl: e.target.value} : p))}
                          className="border-border/50 focus:border-primary transition-colors"
                          placeholder="https://example.com/image.jpg"
                        />
                        {project.imageUrl && (
                          <div className="mt-2 rounded-lg overflow-hidden border border-border/50">
                            <img 
                              src={project.imageUrl} 
                              alt={project.title} 
                              className="w-full h-40 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* AI Hint */}
                      <div className="space-y-2">
                        <Label htmlFor={`aiHint-${project.id}`} className="text-sm font-medium">
                          AI Hint (Optional)
                        </Label>
                        <Input
                          id={`aiHint-${project.id}`}
                          value={project.aiHint ?? ''}
                          onBlur={(e) => handleProjectChange(project.id, 'aiHint', e.target.value)}
                          onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, aiHint: e.target.value} : p))}
                          className="border-border/50 focus:border-primary transition-colors"
                          placeholder="e.g., web development"
                        />
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <Label htmlFor={`tags-${project.id}`} className="flex items-center gap-2 text-sm font-medium">
                          <Tag className="h-4 w-4 text-primary" />
                          Tags (comma-separated)
                        </Label>
                        <Input
                          id={`tags-${project.id}`}
                          value={project.tags.join(', ')}
                          onBlur={(e) => handleProjectChange(project.id, 'tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                          onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)} : p))}
                          className="border-border/50 focus:border-primary transition-colors"
                          placeholder="React, Next.js, Firebase"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
