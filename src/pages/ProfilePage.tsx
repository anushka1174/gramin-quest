import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, Zap, Target, BookOpen, Calendar } from "lucide-react";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const subjects = [
    { name: "Physics", progress: 85, color: "bg-gradient-primary" },
    { name: "Chemistry", progress: 70, color: "bg-gradient-secondary" },
    { name: "Mathematics", progress: 92, color: "bg-gradient-success" },
    { name: "Biology", progress: 65, color: "bg-gradient-warning" },
  ];

  const achievements = [
    { title: "First Quiz Master", icon: Trophy, earned: true },
    { title: "Speed Learner", icon: Zap, earned: true },
    { title: "Perfectionist", icon: Target, earned: false },
    { title: "Knowledge Seeker", icon: BookOpen, earned: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white py-8">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="text-2xl font-bold bg-white/20">P</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Priya Sharma</h1>
              <p className="text-white/90 text-lg">Class 10 • Central High School</p>
              
              <div className="flex items-center gap-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">Level 8</div>
                  <div className="text-sm opacity-80">Current</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1250</div>
                  <div className="text-sm opacity-80">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm opacity-80">Day Streak</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <ProgressRing value={83} size={100} strokeWidth={8} className="text-white" />
              <div className="text-sm mt-2 opacity-80">Overall Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Subject Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < 5 ? 'bg-success text-white' : 'bg-muted'
                      }`}>
                        {i < 5 ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-warning text-white' : 'bg-muted'
                    }`}>
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.earned ? 'Unlocked' : 'Locked'}
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/achievements')}
                >
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Quizzes Completed</span>
                  <Badge variant="secondary">24</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Perfect Scores</span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Study Hours</span>
                  <Badge variant="secondary">47h</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Rank</span>
                  <Badge className="bg-gradient-primary text-white">#12</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}