import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  User, 
  Trophy, 
  Users, 
  Settings, 
  BookOpen, 
  TrendingUp, 
  HelpCircle, 
  Info 
} from "lucide-react";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: Users, label: "Leaderboard", path: "/leaderboard" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: BookOpen, label: "Library", path: "/library" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
  { icon: Info, label: "About", path: "/about" },
];

export function Navigation() {
  const navigate = useNavigate();

  return (
    <Card className="fixed top-4 right-4 z-50 w-64 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-gradient-primary text-white">P</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">Priya Sharma</div>
            <div className="text-xs text-muted-foreground">Level 8</div>
          </div>
        </div>
        
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start h-10 text-sm"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}