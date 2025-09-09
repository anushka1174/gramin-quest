import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bg_gradient: string;
  progress?: number;
  level?: number;
  xp?: number;
}

export function SubjectGrid() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchSubjects();
  }, [user]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;

      // TODO: Calculate progress based on user's actual progress
      const subjectsWithProgress = data?.map(subject => ({
        ...subject,
        progress: Math.floor(Math.random() * 100), // Temporary random progress
        level: Math.floor(Math.random() * 10) + 1,
        xp: Math.floor(Math.random() * 1000) + 100,
      })) || [];

      setSubjects(subjectsWithProgress);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Subjects</h2>
        <Badge variant="secondary">
          {subjects.length} available
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="cursor-pointer transition-all duration-300 hover:shadow-card hover:scale-105 border-2 hover:border-primary/20"
            onClick={() => handleSubjectClick(subject.id)}
          >
            <CardHeader className={`${subject.bg_gradient} text-white rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <div className="text-3xl">{subject.icon}</div>
                <Badge className="bg-white/20 text-white border-white/30">
                  Level {subject.level}
                </Badge>
              </div>
              <CardTitle className="text-xl">{subject.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {subject.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-muted-foreground">XP:</span>
                    <span className="font-medium ml-1">{subject.xp}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Continue Learning
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}