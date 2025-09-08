import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Medal, Trophy } from "lucide-react";

const leaderboard = [
  {
    rank: 1,
    name: "Arjun Kumar",
    points: 2850,
    avatar: "AK",
    icon: <Crown className="w-4 h-4 text-warning" />,
  },
  {
    rank: 2,
    name: "Priya Sharma",
    points: 2640,
    avatar: "PS",
    icon: <Medal className="w-4 h-4 text-gray-400" />,
  },
  {
    rank: 3,
    name: "Raj Patel",
    points: 2480,
    avatar: "RP",
    icon: <Trophy className="w-4 h-4 text-amber-600" />,
  },
  {
    rank: 4,
    name: "You",
    points: 2100,
    avatar: "Y",
    icon: null,
    isCurrentUser: true,
  },
  {
    rank: 5,
    name: "Meera Singh",
    points: 1950,
    avatar: "MS",
    icon: null,
  },
];

export const LeaderboardPanel = () => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏅 Weekly Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              player.isCurrentUser
                ? "bg-primary/10 border border-primary/20"
                : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-2 w-8">
              <span className="text-sm font-bold text-muted-foreground">
                {player.rank}
              </span>
              {player.icon}
            </div>
            
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt={player.name} />
              <AvatarFallback className="text-xs bg-gradient-primary text-white">
                {player.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                player.isCurrentUser ? "text-primary" : ""
              }`}>
                {player.name}
              </p>
            </div>
            
            <span className="text-sm font-bold text-success">
              {player.points}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};