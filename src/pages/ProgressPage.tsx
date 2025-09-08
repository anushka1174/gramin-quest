import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Target, Calendar, Award, BookOpen, Clock, Zap } from "lucide-react";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useTranslation } from "react-i18next";

const progressData = {
  overall: {
    totalXP: 1250,
    level: 8,
    nextLevelXP: 1500,
    completedLessons: 47,
    totalLessons: 60,
    averageScore: 87,
    streak: 7,
    studyHours: 42
  },
  subjects: [
    { name: "Physics", progress: 85, score: 92, lessons: 15, xp: 450, color: "bg-gradient-primary" },
    { name: "Chemistry", progress: 70, score: 85, lessons: 12, xp: 350, color: "bg-gradient-secondary" },
    { name: "Mathematics", progress: 92, score: 89, lessons: 18, xp: 520, color: "bg-gradient-success" },
    { name: "Biology", progress: 65, score: 83, lessons: 10, xp: 280, color: "bg-gradient-warning" },
  ],
  weeklyData: [
    { day: "Mon", xp: 120, lessons: 3, time: 45 },
    { day: "Tue", xp: 180, lessons: 4, time: 60 },
    { day: "Wed", xp: 200, lessons: 5, time: 75 },
    { day: "Thu", xp: 150, lessons: 3, time: 50 },
    { day: "Fri", xp: 220, lessons: 6, time: 80 },
    { day: "Sat", xp: 300, lessons: 7, time: 120 },
    { day: "Sun", xp: 180, lessons: 4, time: 65 },
  ],
  goals: [
    { title: "Complete 50 lessons", current: 47, target: 50, progress: 94, daysLeft: 3 },
    { title: "Reach Level 10", current: 8, target: 10, progress: 80, daysLeft: 12 },
    { title: "Study 50 hours", current: 42, target: 50, progress: 84, daysLeft: 8 },
    { title: "Score 90% average", current: 87, target: 90, progress: 97, daysLeft: 5 },
  ]
};

export default function ProgressPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const maxXP = Math.max(...progressData.weeklyData.map(d => d.xp));

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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Learning Progress</h1>
              <p className="text-white/90 text-lg">Track your academic journey and achievements</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-2" />
              <div className="text-sm opacity-80">Keep Growing!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary">{progressData.overall.level}</div>
                      <div className="text-sm text-muted-foreground">Current Level</div>
                      <Progress 
                        value={(progressData.overall.totalXP / progressData.overall.nextLevelXP) * 100} 
                        className="mt-2 h-2" 
                      />
                      <div className="text-xs mt-1">
                        {progressData.overall.totalXP} / {progressData.overall.nextLevelXP} XP
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-success">{progressData.overall.averageScore}%</div>
                      <div className="text-sm text-muted-foreground">Average Score</div>
                      <div className="flex justify-center mt-2">
                        <Award className="w-6 h-6 text-warning" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-warning">{progressData.overall.streak}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                      <div className="flex justify-center mt-2">
                        <Zap className="w-6 h-6 text-warning" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-secondary">{progressData.overall.studyHours}h</div>
                      <div className="text-sm text-muted-foreground">Study Time</div>
                      <div className="flex justify-center mt-2">
                        <Clock className="w-6 h-6 text-secondary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Lesson Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <ProgressRing 
                          value={(progressData.overall.completedLessons / progressData.overall.totalLessons) * 100} 
                          size={120} 
                          strokeWidth={8} 
                        />
                        <div className="mt-2 font-bold">
                          {progressData.overall.completedLessons} / {progressData.overall.totalLessons} Lessons
                        </div>
                      </div>
                      <Progress 
                        value={(progressData.overall.completedLessons / progressData.overall.totalLessons) * 100} 
                        className="h-3"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <div className="font-medium">Physics Quiz Completed</div>
                      <div className="text-muted-foreground">Score: 95% • 2 hours ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Math Lesson Finished</div>
                      <div className="text-muted-foreground">Trigonometry • 5 hours ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Achievement Unlocked</div>
                      <div className="text-muted-foreground">Speed Learner • 1 day ago</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects">
            <div className="grid md:grid-cols-2 gap-6">
              {progressData.subjects.map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
                      {subject.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <ProgressRing value={subject.progress} size={100} strokeWidth={6} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-lg">{subject.lessons}</div>
                        <div className="text-muted-foreground">Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{subject.score}%</div>
                        <div className="text-muted-foreground">Avg Score</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge className={`${subject.color} text-white`}>
                        {subject.xp} XP Earned
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-7 gap-2">
                    {progressData.weeklyData.map((day, index) => (
                      <div key={index} className="text-center space-y-2">
                        <div className="text-sm font-medium">{day.day}</div>
                        <div 
                          className="bg-gradient-primary rounded-lg text-white p-2 text-xs"
                          style={{ height: `${(day.xp / maxXP) * 100 + 20}px` }}
                        >
                          {day.xp} XP
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {day.lessons} lessons
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {day.time}m
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">1350</div>
                      <div className="text-sm text-muted-foreground">Total XP This Week</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">32</div>
                      <div className="text-sm text-muted-foreground">Lessons Completed</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">495</div>
                      <div className="text-sm text-muted-foreground">Minutes Studied</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals">
            <div className="space-y-4">
              {progressData.goals.map((goal, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        {goal.title}
                      </CardTitle>
                      <Badge variant="outline">
                        {goal.daysLeft} days left
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>{goal.current} / {goal.target}</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}