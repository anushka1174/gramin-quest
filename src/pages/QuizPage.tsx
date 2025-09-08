import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

const quizData = {
  "physics-forces": {
    title: "Forces and Motion Quiz",
    questions: [
      {
        id: "1",
        type: "multiple_choice" as const,
        question: "What is Newton's First Law of Motion?",
        options: [
          "Objects at rest stay at rest, objects in motion stay in motion",
          "Force equals mass times acceleration",
          "For every action, there is an equal and opposite reaction",
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: "Objects at rest stay at rest, objects in motion stay in motion",
        explanation: "Newton's First Law, also known as the Law of Inertia, states that objects at rest stay at rest and objects in motion stay in motion unless acted upon by an external force."
      },
      {
        id: "2",
        type: "number_input" as const,
        question: "24 ÷ 6 = ?",
        correctAnswer: 4,
        explanation: "24 divided by 6 equals 4."
      },
      {
        id: "3",
        type: "slider" as const,
        question: "4 × 3 = ?",
        correctAnswer: 12,
        range: { min: 0, max: 20 },
        explanation: "4 multiplied by 3 equals 12."
      },
      {
        id: "4",
        type: "matching" as const,
        question: "Match the mathematical operations with their results:",
        pairs: {
          left: ["8 ÷ 4", "36 ÷ 9", "40 ÷ 8"],
          right: ["2", "4", "5"]
        },
        correctAnswer: JSON.stringify({"8 ÷ 4": "2", "36 ÷ 9": "4", "40 ÷ 8": "5"}),
        explanation: "These are basic division problems: 8÷4=2, 36÷9=4, 40÷8=5"
      }
    ]
  }
};

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [isComplete, setIsComplete] = useState(false);
  
  const quiz = quizData[quizId as keyof typeof quizData];
  
  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleAnswer = (answer: string | number, isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
      setHearts(prev => Math.max(0, prev - 1));
    }
    
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setHearts(5);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const xpGained = score * 10;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/20 to-warning/20 p-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl font-bold text-success">{percentage}%</div>
            <p className="text-muted-foreground">
              You got {score} out of {quiz.questions.length} questions correct
            </p>
            
            <div className="flex justify-center gap-8 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">+{xpGained}</div>
                <div className="text-sm text-muted-foreground">XP Gained</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                  {score} <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-sm text-muted-foreground">Stars Earned</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={restartQuiz}
                variant="outline" 
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('common.retry')}
              </Button>
              <Button 
                onClick={() => navigate(-1)}
                className="w-full bg-success hover:bg-success/90"
              >
                {t('common.continue')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hearts === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/20 to-muted/20 p-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">Out of Hearts!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Don't worry! You can try again and keep learning.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={restartQuiz}
                className="w-full bg-success hover:bg-success/90"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={() => navigate(-1)}
                variant="outline" 
                className="w-full"
              >
                Back to Chapter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <QuizQuestion
      question={quiz.questions[currentQuestion]}
      onAnswer={handleAnswer}
      questionNumber={currentQuestion + 1}
      totalQuestions={quiz.questions.length}
      streak={streak}
      hearts={hearts}
    />
  );
}