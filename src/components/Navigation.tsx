import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { 
  Home, 
  BookOpen, 
  Target, 
  Trophy, 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  Info,
  LogOut,
  User
} from "lucide-react";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Library", path: "/library" },
  { icon: Target, label: "Progress", path: "/progress" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: TrendingUp, label: "Leaderboard", path: "/leaderboard" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
  { icon: Info, label: "About", path: "/about" },
];

export function Navigation() {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <Card className="fixed left-4 top-4 bottom-4 w-64 z-50 shadow-card">
      <CardHeader className="text-center border-b">
        <Avatar className="w-16 h-16 mx-auto mb-2">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback>
            {profile?.full_name?.charAt(0) || <User className="w-8 h-8" />}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg">{profile?.full_name || "Student"}</CardTitle>
        <p className="text-sm text-muted-foreground capitalize">{profile?.role || "Student"}</p>
        {profile?.grade_level && (
          <p className="text-xs text-muted-foreground">Grade {profile.grade_level}</p>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <nav className="space-y-1 p-2">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
          
          <div className="pt-2 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4 mr-3" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </nav>
      </CardContent>
    </Card>
  );
}