import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Heart, Zap, Trophy } from "lucide-react";
import { LanguageThemeToggle } from "@/components/LanguageThemeToggle";
import owlMascot from "@/assets/owl-mascot.png";
import { useTranslation } from "react-i18next";

interface GameHeaderProps {
  playerName: string;
  level: number;
  xp: number;
  maxXp: number;
  health: number;
  energy: number;
  streak: number;
}

export const GameHeader = ({
  playerName,
  level,
  xp,
  maxXp,
  health,
  energy,
  streak,
}: GameHeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="bg-card border-b border-border shadow-card p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 border-2 border-primary">
            <AvatarImage src={owlMascot} alt={playerName} />
            <AvatarFallback className="bg-gradient-primary text-white font-bold">
              {playerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h2 className="font-bold text-lg">{playerName}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('game.level')} {level}</span>
              <Progress value={(xp / maxXp) * 100} className="w-20 h-2" />
              <span className="text-xs text-muted-foreground">{xp}/{maxXp} {t('game.xp')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-bold text-red-500">{health}/100</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-warning" />
            <span className="font-bold text-warning">{energy}/100</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-success" />
            <span className="font-bold text-success">{streak} {t('game.streak')}</span>
          </div>

          <LanguageThemeToggle />
        </div>
      </div>
    </header>
  );
};