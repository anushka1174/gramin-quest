import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Lock, CheckCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const subjectData = {
  physics: {
    title: "Physics",
    description: "Explore the fundamental laws of nature through interactive experiments",
    bgGradient: "bg-gradient-primary",
    chapters: [
      {
        id: 1,
        title: "Motion and Forces",
        description: "Laws of motion, Newton's laws, and force dynamics",
        progress: 100,
        unlocked: true,
        completed: true,
        lessons: 8,
        simulations: 3,
        xp: 200,
      },
      {
        id: 2,
        title: "Energy and Work",
        description: "Kinetic energy, potential energy, and conservation laws",
        progress: 75,
        unlocked: true,
        completed: false,
        lessons: 6,
        simulations: 2,
        xp: 150,
      },
      {
        id: 3,
        title: "Waves and Sound",
        description: "Wave properties, sound waves, and wave interactions",
        progress: 0,
        unlocked: true,
        completed: false,
        lessons: 10,
        simulations: 4,
        xp: 250,
      },
      {
        id: 4,
        title: "Light and Optics",
        description: "Reflection, refraction, and optical instruments",
        progress: 0,
        unlocked: false,
        completed: false,
        lessons: 12,
        simulations: 5,
        xp: 300,
      },
    ],
  },
  // Add other subjects here...
};

export default function SubjectPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  
  const subject = subjectData[subjectId as keyof typeof subjectData];
  
  if (!subject) {
    return <div>Subject not found</div>;
  }

  const handleChapterClick = (chapterId: number, unlocked: boolean) => {
    if (unlocked) {
      navigate(`/subject/${subjectId}/chapter/${chapterId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className={`${subject.bgGradient} text-white py-8`}>
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
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{subject.title}</h1>
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
            {subject.chapters.map((chapter, index) => (
              <Card
                key={chapter.id}
                className={`transition-all duration-300 cursor-pointer ${
                  chapter.unlocked
                    ? "hover:shadow-card hover:scale-[1.02]"
                    : "opacity-60"
                } ${chapter.completed ? "border-success" : ""}`}
                onClick={() => handleChapterClick(chapter.id, chapter.unlocked)}
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
                          Chapter {chapter.id}: {chapter.title}
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
                      <Progress value={chapter.progress} className="h-2" />
                    )}
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{chapter.lessons} lessons</span>
                      <span>{chapter.simulations} simulations</span>
                      <span>{chapter.progress}% complete</span>
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