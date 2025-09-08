import { GameHeader } from "@/components/GameHeader";
import { SubjectGrid } from "@/components/SubjectGrid";
import { AchievementPanel } from "@/components/AchievementPanel";
import { LeaderboardPanel } from "@/components/LeaderboardPanel";
import { Navigation } from "@/components/Navigation";
import catStudying from "@/assets/cat-studying.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <GameHeader
        playerName="Priya"
        level={8}
        xp={1250}
        maxXp={1500}
        health={85}
        energy={92}
        streak={7}
      />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <SubjectGrid />
          </div>
          
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-purple rounded-2xl text-white">
              <img
                src={catStudying}
                alt="Study mascot"
                className="w-24 h-24 mx-auto mb-4 animate-float"
              />
              <h3 className="font-bold text-lg mb-2">Keep Learning! 📚</h3>
              <p className="text-sm opacity-90">
                You're doing great! Complete today's lessons to maintain your streak.
              </p>
            </div>
            
            <AchievementPanel />
            <LeaderboardPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
