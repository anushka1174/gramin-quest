import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, BookOpen, Zap, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const chapterData = {
  1: {
    title: "Motion and Forces",
    description: "Master the fundamental laws of motion through interactive experiments",
    activities: [
      {
        type: "lesson",
        title: "Newton's First Law",
        description: "Objects at rest stay at rest, objects in motion stay in motion",
        duration: "15 min",
        xp: 25,
        completed: true,
      },
      {
        type: "simulation",
        title: "Force and Acceleration Simulator",
        description: "Interactive physics lab to explore F = ma",
        duration: "20 min",
        xp: 50,
        completed: true,
      },
      {
        type: "lesson",
        title: "Newton's Second Law",
        description: "The relationship between force, mass, and acceleration",
        duration: "18 min",
        xp: 30,
        completed: true,
      },
      {
        type: "quiz",
        title: "Forces Quiz",
        description: "Test your understanding of forces and motion",
        duration: "10 min",
        xp: 40,
        completed: false,
        quizId: "physics-forces",
      },
      {
        type: "simulation",
        title: "Projectile Motion Lab",
        description: "Explore parabolic motion and trajectory calculations",
        duration: "25 min",
        xp: 60,
        completed: false,
      },
    ],
  },
};

export default function ChapterPage() {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  
  const chapter = chapterData[chapterId as unknown as keyof typeof chapterData];
  
  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="w-5 h-5" />;
      case "simulation":
        return <Zap className="w-5 h-5" />;
      case "quiz":
        return <Trophy className="w-5 h-5" />;
      default:
        return <Play className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "lesson":
        return "bg-gradient-primary";
      case "simulation":
        return "bg-gradient-warning";
      case "quiz":
        return "bg-gradient-success";
      default:
        return "bg-gradient-secondary";
    }
  };

  const handleActivityClick = (activityIndex: number) => {
    const activity = chapter.activities[activityIndex];
    if (activity.type === "simulation") {
      navigate(`/subject/${subjectId}/chapter/${chapterId}/simulation/${activityIndex}`);
    } else if (activity.type === "quiz" && activity.quizId) {
      navigate(`/quiz/${activity.quizId}`);
    } else {
      // Handle other activity types (lessons, etc.)
      console.log(`Opening ${activity.type}: ${activity.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white py-8">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate(`/subject/${subjectId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Physics
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">{chapter.title}</h1>
          <p className="text-white/90 text-lg">{chapter.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Learning Activities</h2>
          <div className="grid gap-4">
            {chapter.activities.map((activity, index) => (
              <Card
                key={index}
                className="transition-all duration-300 cursor-pointer hover:shadow-card hover:scale-[1.02]"
                onClick={() => handleActivityClick(index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {activity.completed && (
                        <Badge variant="secondary" className="bg-success text-white">
                          Completed
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`${getActivityColor(activity.type)} text-white border-0`}
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>⏱️ {activity.duration}</span>
                    <span>⭐ {activity.xp} XP</span>
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