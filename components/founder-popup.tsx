'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, MapPin, GraduationCap, Briefcase, TrendingUp, Users, Globe, Award, Code2, Loader2 } from 'lucide-react';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface ContributorsData {
  contributors: Contributor[];
  totalContributors: number;
  totalRepos: number;
}

export function FounderPopup() {
  const [open, setOpen] = useState(false);
  const [contributors, setContributors] = useState<ContributorsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenFounderPopup');
    
    if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Fetch contributors when popup opens
    if (open) {
      fetchContributors();
    }
  }, [open]);

  const fetchContributors = async () => {
    try {
      const response = await fetch('/api/contributors');
      if (response.ok) {
        const data = await response.json();
        setContributors(data);
      }
    } catch (error) {
      console.error('Error fetching contributors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('hasSeenFounderPopup', 'true');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Meet the Team
            </span>
          </DialogTitle>
          <DialogDescription>
            The visionary founder and talented contributors behind TIVerse - Tonmoy Infrastructure
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/20">
              <AvatarImage src="https://github.com/eshanized.png" alt="Eshan Roy" />
              <AvatarFallback className="text-2xl font-bold">ER</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">Eshan Roy</h3>
                <p className="text-lg text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Briefcase className="h-4 w-4" />
                  Development Director & CEO
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  Bangladesh 🇧🇩
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  67% Shareholder
                </Badge>
              </div>

              <Button
                variant="default"
                size="sm"
                className="gap-2"
                onClick={() => window.open('https://github.com/eshanized', '_blank')}
              >
                <Github className="h-4 w-4" />
                View GitHub Profile
              </Button>
            </div>
          </div>

          <Separator />

          {/* Mission Statement */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm md:text-base italic text-center">
                &quot;Every system should operate like a flight control system — rigorously tested, 
                fault-tolerant, and mission-critical by design.&quot;
              </p>
            </CardContent>
          </Card>

          {/* Key Achievements */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Key Achievements at TIVerse
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">30%</div>
                  <p className="text-sm text-muted-foreground">Revenue Growth (2024)</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1 flex items-center justify-center gap-1">
                    <Award className="h-6 w-6" />
                    20+
                  </div>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1 flex items-center justify-center gap-1">
                    <Users className="h-6 w-6" />
                    30+
                  </div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1 flex items-center justify-center gap-1">
                    <Globe className="h-6 w-6" />
                    5+
                  </div>
                  <p className="text-sm text-muted-foreground">Countries Served</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">98%</div>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">A+</div>
                  <p className="text-sm text-muted-foreground">Innovation Score</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h4>
            <div className="space-y-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Computer Science (AI & Cyber Security)</p>
                      <p className="text-sm text-muted-foreground">University of The People</p>
                      <Badge variant="secondary" className="mt-2">Current</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Aerospace Engineering</p>
                      <p className="text-sm text-muted-foreground">Lovely Professional University</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Competencies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Core Competencies</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Rust Systems Programming',
                'Infrastructure Architecture',
                'AI Agent Frameworks',
                'Cloud Architecture',
                'DevOps & CI/CD',
                'Kubernetes & Docker',
                'Penetration Testing',
                'Zero Trust Design',
                'Aerospace Engineering',
                'Safety-Critical Systems',
                'OS Development',
                'Hardware Security',
              ].map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Fun Fact */}
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-center font-medium">
                ✈️ Fun Fact: &quot;I design systems that fly—both in the sky and in the cloud ☁️✈️&quot;
              </p>
            </CardContent>
          </Card>

          <Separator />

          {/* Contributors Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              TIVerse Contributors
            </h4>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : contributors && contributors.contributors.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{contributors.totalContributors}</div>
                      <p className="text-xs text-muted-foreground">Contributors</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{contributors.totalRepos}</div>
                      <p className="text-xs text-muted-foreground">Repositories</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {contributors.contributors.reduce((sum, c) => sum + c.contributions, 0)}
                      </div>
                      <p className="text-xs text-muted-foreground">Total Contributions</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {contributors.contributors.slice(0, 12).map((contributor) => (
                    <Card 
                      key={contributor.login}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => window.open(contributor.html_url, '_blank')}
                    >
                      <CardContent className="pt-6 text-center">
                        <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-primary/20">
                          <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
                          <AvatarFallback>{contributor.login[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-sm truncate">{contributor.login}</p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {contributor.contributions} commits
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {contributors.contributors.length > 12 && (
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('https://github.com/orgs/TIVerse/people', '_blank')}
                    >
                      View All Contributors
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No contributors data available at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button 
            onClick={() => {
              window.open('https://github.com/eshanized', '_blank');
              handleClose();
            }}
          >
            Connect on GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
