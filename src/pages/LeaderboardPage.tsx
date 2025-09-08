import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Star, Flame, Crown, Medal, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const leaderboardData = {
  weekly: [
    { rank: 1, name: "Arjun Kumar", xp: 2340, level: 12, streak: 14, avatar: "/placeholder.svg", school: "Delhi Public School" },
    { rank: 2, name: "Priya Sharma", xp: 2180, level: 11, streak: 12, avatar: "/placeholder.svg", school: "Central High School" },
    { rank: 3, name: "Rohit Singh", xp: 2050, level: 10, streak: 8, avatar: "/placeholder.svg", school: "St. Mary's School" },
    { rank: 4, name: "Anjali Gupta", xp: 1890, level: 9, streak: 15, avatar: "/placeholder.svg", school: "Modern School" },
    { rank: 5, name: "Vikram Rao", xp: 1750, level: 9, streak: 6, avatar: "/placeholder.svg", school: "Kendriya Vidyalaya" },
    { rank: 6, name: "Sneha Patel", xp: 1650, level: 8, streak: 11, avatar: "/placeholder.svg", school: "DAV School" },
    { rank: 7, name: "Rahul Jain", xp: 1580, level: 8, streak: 9, avatar: "/placeholder.svg", school: "Ryan International" },
    { rank: 8, name: "Kavya Nair", xp: 1520, level: 7, streak: 7, avatar: "/placeholder.svg", school: "Bal Bharati" },
  ],
  monthly: [
    { rank: 1, name: "Priya Sharma", xp: 8900, level: 15, streak: 28, avatar: "/placeholder.svg", school: "Central High School" },
    { rank: 2, name: "Arjun Kumar", xp: 8650, level: 14, streak: 25, avatar: "/placeholder.svg", school: "Delhi Public School" },
    { rank: 3, name: "Sneha Patel", xp: 8200, level: 13, streak: 22, avatar: "/placeholder.svg", school: "DAV School" },
    { rank: 4, name: "Vikram Rao", xp: 7980, level: 12, streak: 20, avatar: "/placeholder.svg", school: "Kendriya Vidyalaya" },
    { rank: 5, name: "Anjali Gupta", xp: 7750, level: 12, streak: 18, avatar: "/placeholder.svg", school: "Modern School" },
    { rank: 6, name: "Rohit Singh", xp: 7500, level: 11, streak: 16, avatar: "/placeholder.svg", school: "St. Mary's School" },
    { rank: 7, name: "Rahul Jain", xp: 7200, level: 10, streak: 14, avatar: "/placeholder.svg", school: "Ryan International" },
    { rank: 8, name: "Kavya Nair", xp: 6950, level: 10, streak: 12, avatar: "/placeholder.svg", school: "Bal Bharati" },
  ],
  allTime: [
    { rank: 1, name: "Arjun Kumar", xp: 25600, level: 28, streak: 45, avatar: "/placeholder.svg", school: "Delhi Public School" },
    { rank: 2, name: "Sneha Patel", xp: 24800, level: 26, streak: 38, avatar: "/placeholder.svg", school: "DAV School" },
    { rank: 3, name: "Priya Sharma", xp: 23900, level: 25, streak: 42, avatar: "/placeholder.svg", school: "Central High School" },
    { rank: 4, name: "Vikram Rao", xp: 22700, level: 24, streak: 35, avatar: "/placeholder.svg", school: "Kendriya Vidyalaya" },
    { rank: 5, name: "Anjali Gupta", xp: 21500, level: 22, streak: 30, avatar: "/placeholder.svg", school: "Modern School" },
    { rank: 6, name: "Rohit Singh", xp: 20800, level: 21, streak: 28, avatar: "/placeholder.svg", school: "St. Mary's School" },
    { rank: 7, name: "Rahul Jain", xp: 19900, level: 20, streak: 25, avatar: "/placeholder.svg", school: "Ryan International" },
    { rank: 8, name: "Kavya Nair", xp: 18700, level: 19, streak: 22, avatar: "/placeholder.svg", school: "Bal Bharati" },
  ]
};

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-warning" />;
      case 2: return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-lg font-bold">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-warning/20 to-warning/10 border-warning/30";
      case 2: return "bg-gradient-to-r from-muted/20 to-muted/10 border-muted/30";
      case 3: return "bg-gradient-to-r from-amber-500/20 to-amber-500/10 border-amber-500/30";
      default: return "";
    }
  };

  const LeaderboardList = ({ data }: { data: typeof leaderboardData.weekly }) => (
    <div className="space-y-3">
      {data.map((student, index) => (
        <Card 
          key={index} 
          className={`transition-all duration-300 hover:shadow-card ${getRankBg(student.rank)}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12">
                {getRankIcon(student.rank)}
              </div>
              
              <Avatar className="w-12 h-12">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="font-semibold text-lg">{student.name}</div>
                <div className="text-sm text-muted-foreground">{student.school}</div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="font-bold">{student.xp.toLocaleString()} XP</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>Lvl {student.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>{student.streak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-success text-white py-8">
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
              <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
              <p className="text-white/90 text-lg">Compete with students across India</p>
            </div>
            
            <div className="text-center">
              <Trophy className="w-16 h-16 mx-auto mb-2 text-warning" />
              <div className="text-sm opacity-80">Your Rank: #12</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Weekly Champions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardList data={leaderboardData.weekly} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Monthly Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardList data={leaderboardData.monthly} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="allTime">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Hall of Fame
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardList data={leaderboardData.allTime} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}