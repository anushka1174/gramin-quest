import { AchievementBadge } from "@/components/ui/achievement-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const achievements = [
  {
    type: "star" as const,
    title: "First Steps",
    description: "Complete your first lesson",
    unlocked: true,
  },
  {
    type: "trophy" as const,
    title: "Physics Master",
    description: "Score 100% in 5 physics quizzes",
    unlocked: true,
  },
  {
    type: "zap" as const,
    title: "Speed Learner",
    description: "Complete 10 lessons in one day",
    unlocked: false,
  },
  {
    type: "target" as const,
    title: "Streak Champion",
    description: "Maintain 30-day learning streak",
    unlocked: false,
  },
];

export const AchievementPanel = () => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 Achievements
          <span className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded-full">
            2/4
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement, index) => (
          <AchievementBadge
            key={index}
            type={achievement.type}
            title={achievement.title}
            description={achievement.description}
            unlocked={achievement.unlocked}
          />
        ))}
      </CardContent>
    </Card>
  );
};