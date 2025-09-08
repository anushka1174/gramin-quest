import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, Zap, Target, BookOpen, Award, Flame, Brain, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const achievementCategories = [
  {
    title: "Learning Milestones",
    achievements: [
      {
        title: "First Steps",
        description: "Complete your first lesson",
        icon: BookOpen,
        earned: true,
        progress: 100,
        xp: 25,
        rarity: "common"
      },
      {
        title: "Quiz Master",
        description: "Score 100% on 5 quizzes",
        icon: Trophy,
        earned: true,
        progress: 100,
        xp: 100,
        rarity: "rare"
      },
      {
        title: "Perfect Student",
        description: "Score 100% on 20 quizzes",
        icon: Award,
        earned: false,
        progress: 40,
        xp: 500,
        rarity: "legendary"
      }
    ]
  },
  {
    title: "Speed & Efficiency",
    achievements: [
      {
        title: "Speed Learner",
        description: "Complete a lesson in under 10 minutes",
        icon: Zap,
        earned: true,
        progress: 100,
        xp: 50,
        rarity: "uncommon"
      },
      {
        title: "Lightning Fast",
        description: "Answer 10 questions in under 2 minutes",
        icon: Clock,
        earned: false,
        progress: 70,
        xp: 75,
        rarity: "rare"
      }
    ]
  },
  {
    title: "Consistency",
    achievements: [
      {
        title: "Daily Learner",
        description: "Study for 7 consecutive days",
        icon: Flame,
        earned: true,
        progress: 100,
        xp: 150,
        rarity: "uncommon"
      },
      {
        title: "Dedicated Student",
        description: "Study for 30 consecutive days",
        icon: Target,
        earned: false,
        progress: 23,
        xp: 500,
        rarity: "legendary"
      }
    ]
  },
  {
    title: "Knowledge Mastery",
    achievements: [
      {
        title: "Physics Expert",
        description: "Complete all Physics chapters",
        icon: Brain,
        earned: false,
        progress: 85,
        xp: 300,
        rarity: "epic"
      },
      {
        title: "Math Genius",
        description: "Score 95%+ average in Mathematics",
        icon: Star,
        earned: false,
        progress: 60,
        xp: 400,
        rarity: "epic"
      }
    ]
  }
];

export default function AchievementsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-muted text-muted-foreground";
      case "uncommon": return "bg-gradient-secondary text-white";
      case "rare": return "bg-gradient-primary text-white";
      case "epic": return "bg-gradient-warning text-white";
      case "legendary": return "bg-gradient-success text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getIconBg = (earned: boolean, rarity: string) => {
    if (!earned) return "bg-muted text-muted-foreground";
    return getRarityColor(rarity);
  };

  const totalAchievements = achievementCategories.reduce((acc, cat) => acc + cat.achievements.length, 0);
  const earnedAchievements = achievementCategories.reduce((acc, cat) => 
    acc + cat.achievements.filter(a => a.earned).length, 0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-warning text-white py-8">
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
              <h1 className="text-4xl font-bold mb-2">Achievements</h1>
              <p className="text-white/90 text-lg">Unlock rewards by reaching learning milestones</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold">{earnedAchievements}/{totalAchievements}</div>
              <div className="text-sm opacity-80">Unlocked</div>
            </div>
          </div>
          
          <div className="mt-6">
            <Progress value={(earnedAchievements / totalAchievements) * 100} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {achievementCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.achievements.map((achievement, index) => (
                  <Card 
                    key={index} 
                    className={`transition-all duration-300 ${
                      achievement.earned 
                        ? "hover:shadow-card hover:scale-[1.02] border-warning/50" 
                        : "opacity-75"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            getIconBg(achievement.earned, achievement.rarity)
                          }`}>
                            <achievement.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            <Badge 
                              variant="outline" 
                              className={`text-xs mt-1 ${getRarityColor(achievement.rarity)}`}
                            >
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        {achievement.earned && (
                          <Trophy className="w-5 h-5 text-warning" />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      
                      {!achievement.earned && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-1" />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">
                          +{achievement.xp} XP
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-success text-white text-xs">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}