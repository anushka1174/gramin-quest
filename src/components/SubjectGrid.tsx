import { SubjectCard } from "@/components/ui/subject-card";
import { useNavigate } from "react-router-dom";
import {
  Atom,
  Beaker,
  Calculator,
  Dna,
  Globe,
  BookOpen,
  Monitor,
  Languages,
} from "lucide-react";

const subjects = [
  {
    id: "physics",
    title: "Physics",
    icon: <Atom className="w-8 h-8" />,
    progress: 75,
    level: 8,
    points: 1250,
    bgGradient: "bg-gradient-primary",
  },
  {
    id: "chemistry",
    title: "Chemistry",
    icon: <Beaker className="w-8 h-8" />,
    progress: 60,
    level: 6,
    points: 980,
    bgGradient: "bg-gradient-secondary",
  },
  {
    id: "mathematics",
    title: "Mathematics",
    icon: <Calculator className="w-8 h-8" />,
    progress: 85,
    level: 10,
    points: 1680,
    bgGradient: "bg-gradient-warning",
  },
  {
    id: "biology",
    title: "Biology",
    icon: <Dna className="w-8 h-8" />,
    progress: 45,
    level: 5,
    points: 750,
    bgGradient: "bg-gradient-success",
  },
  {
    id: "social-studies",
    title: "Social Studies",
    icon: <Globe className="w-8 h-8" />,
    progress: 55,
    level: 6,
    points: 890,
    bgGradient: "bg-gradient-purple",
  },
  {
    id: "english",
    title: "English",
    icon: <BookOpen className="w-8 h-8" />,
    progress: 70,
    level: 7,
    points: 1150,
    bgGradient: "bg-gradient-pink",
  },
  {
    id: "computer-science",
    title: "Computer Science",
    icon: <Monitor className="w-8 h-8" />,
    progress: 90,
    level: 12,
    points: 2100,
    bgGradient: "bg-gradient-primary",
  },
  {
    id: "hindi",
    title: "Hindi",
    icon: <Languages className="w-8 h-8" />,
    progress: 65,
    level: 7,
    points: 1020,
    bgGradient: "bg-gradient-secondary",
  },
];

export const SubjectGrid = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Choose Your Learning Adventure! 🚀
        </h1>
        <p className="text-muted-foreground text-center">
          Master subjects through fun games and interactive simulations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            title={subject.title}
            icon={subject.icon}
            progress={subject.progress}
            level={subject.level}
            points={subject.points}
            bgGradient={subject.bgGradient}
            onClick={() => handleSubjectClick(subject.id)}
          />
        ))}
      </div>
    </div>
  );
};