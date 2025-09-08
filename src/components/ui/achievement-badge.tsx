import { cn } from "@/lib/utils";
import { Star, Trophy, Target, Zap } from "lucide-react";

interface AchievementBadgeProps {
  type: "star" | "trophy" | "target" | "zap";
  title: string;
  description: string;
  unlocked?: boolean;
  className?: string;
}

const iconMap = {
  star: Star,
  trophy: Trophy,
  target: Target,
  zap: Zap,
};

const colorMap = {
  star: "bg-gradient-warning",
  trophy: "bg-gradient-success",
  target: "bg-gradient-primary",
  zap: "bg-gradient-purple",
};

export const AchievementBadge = ({
  type,
  title,
  description,
  unlocked = false,
  className,
}: AchievementBadgeProps) => {
  const Icon = iconMap[type];
  const bgColor = colorMap[type];

  return (
    <div
      className={cn(
        "relative p-4 rounded-2xl border-2 transition-all duration-300",
        unlocked
          ? `${bgColor} text-white border-white/30 animate-bounce-gentle`
          : "bg-muted text-muted-foreground border-muted",
        unlocked && "hover:scale-105 cursor-pointer",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "p-2 rounded-full",
            unlocked ? "bg-white/20" : "bg-muted-foreground/20"
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm">{title}</h4>
          <p className="text-xs opacity-80">{description}</p>
        </div>
      </div>
      
      {unlocked && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};