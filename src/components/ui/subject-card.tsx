import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";

interface SubjectCardProps {
  title: string;
  icon: ReactNode;
  progress: number;
  level: number;
  points: number;
  bgGradient: string;
  onClick?: () => void;
  className?: string;
}

export const SubjectCard = ({
  title,
  icon,
  progress,
  level,
  points,
  bgGradient,
  onClick,
  className,
}: SubjectCardProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow border-0",
        bgGradient,
        className
      )}
      onClick={onClick}
    >
      <div className="p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl animate-float">{icon}</div>
          <ProgressRing progress={progress} size={60} strokeWidth={6}>
            <span className="text-sm font-bold">{progress}%</span>
          </ProgressRing>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        <div className="flex justify-between items-center text-sm opacity-90">
          <span>Level {level}</span>
          <span>{points} XP</span>
        </div>
        
        <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
};