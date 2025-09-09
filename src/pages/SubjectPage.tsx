import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Lock, CheckCircle, Star, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bg_gradient: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  chapter_number: number;
  difficulty: string;
  estimated_hours: number;
  progress?: number;
  unlocked?: boolean;
  completed?: boolean;
  lessons?: number;
  simulations?: number;
  xp?: number;
}

export default function SubjectPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subjectId) {
      fetchSubjectData();
    }
  }, [subjectId, user]);

  const fetchSubjectData = async () => {
    try {
      setLoading(true);
      
      // Fetch subject
      const { data: subjectData, error: subjectError } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", subjectId)
        .single();

      if (subjectError) throw subjectError;
      setSubject(subjectData);

      // Fetch chapters
      const { data: chaptersData, error: chaptersError } = await supabase
        .from("chapters")
        .select(`
          *,
          lessons(count),
          simulations(count)
        `)
        .eq("subject_id", subjectId)
        .eq("is_active", true)
        .order("chapter_number");

      if (chaptersError) throw chaptersError;

      // Add mock progress data (TODO: Calculate real progress)
      const chaptersWithProgress = chaptersData?.map((chapter, index) => ({
        ...chapter,
        progress: index === 0 ? 100 : index === 1 ? 75 : 0,
        unlocked: index <= 2,
        completed: index === 0,
        lessons: chapter.lessons?.[0]?.count || 0,
        simulations: chapter.simulations?.[0]?.count || 0,
        xp: (index + 1) * 50,
      })) || [];

      setChapters(chaptersWithProgress);
    } catch (error) {
      console.error("Error fetching subject data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChapterClick = (chapterId: string, unlocked: boolean) => {
    if (unlocked) {
      navigate(`/subject/${subjectId}/chapter/${chapterId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!subject) {
    return <div>Subject not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className={`${subject.bg_gradient} text-white py-8`}>
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Button>
          
          <div className="flex items-center gap-6">
            <div className="text-4xl">{subject.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
              <p className="text-white/90 text-lg">{subject.description}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm opacity-80">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1250</div>
                  <div className="text-sm opacity-80">XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">75%</div>
                  <div className="text-sm opacity-80">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Learning Path</h2>
          <div className="grid gap-4">
            {chapters.map((chapter, index) => (
              <Card
                key={chapter.id}
                className={`transition-all duration-300 cursor-pointer ${
                  chapter.unlocked
                    ? "hover:shadow-card hover:scale-[1.02]"
                    : "opacity-60"
                } ${chapter.completed ? "border-success" : ""}`}
                onClick={() => handleChapterClick(chapter.id, chapter.unlocked || false)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          chapter.completed
                            ? "bg-success"
                            : chapter.unlocked
                            ? "bg-primary"
                            : "bg-muted-foreground"
                        }`}
                      >
                        {chapter.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : chapter.unlocked ? (
                          <Play className="w-5 h-5" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          Chapter {chapter.chapter_number}: {chapter.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {chapter.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {chapter.completed && (
                        <Badge variant="secondary" className="bg-success text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {chapter.xp} XP
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {chapter.unlocked && (
                      <Progress value={chapter.progress || 0} className="h-2" />
                    )}
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{chapter.lessons} lessons</span>
                      <span>{chapter.simulations} simulations</span>
                      <span>{chapter.progress || 0}% complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}