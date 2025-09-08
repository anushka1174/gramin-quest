import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PhysicsSimulation } from "@/components/PhysicsSimulation";

const simulations = {
  1: {
    title: "Force and Acceleration Simulator",
    description: "Explore Newton's second law with interactive force and mass controls",
  },
  4: {
    title: "Projectile Motion Lab",
    description: "Study parabolic motion and trajectory calculations",
  },
};

export default function SimulationPage() {
  const { subjectId, chapterId, simulationId } = useParams();
  const navigate = useNavigate();
  
  const simulation = simulations[simulationId as unknown as keyof typeof simulations];
  
  if (!simulation) {
    return <div>Simulation not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-warning text-white py-6">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate(`/subject/${subjectId}/chapter/${chapterId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chapter
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{simulation.title}</h1>
          <p className="text-white/90">{simulation.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <PhysicsSimulation
          title={simulation.title}
          description={simulation.description}
        />
      </div>
    </div>
  );
}