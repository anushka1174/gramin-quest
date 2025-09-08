import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Heart, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";

interface QuizQuestionProps {
  question: {
    id: string;
    type: "multiple_choice" | "number_input" | "slider" | "matching";
    question: string;
    options?: string[];
    correctAnswer: string | number;
    explanation?: string;
    range?: { min: number; max: number };
    pairs?: { left: string[]; right: string[] };
  };
  onAnswer: (answer: string | number, isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  streak: number;
  hearts: number;
}

export const QuizQuestion = ({ 
  question, 
  onAnswer, 
  questionNumber, 
  totalQuestions, 
  streak, 
  hearts 
}: QuizQuestionProps) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>("");
  const [sliderValue, setSliderValue] = useState([50]);
  const [matching, setMatching] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    let answer: string | number = "";
    let correct = false;

    switch (question.type) {
      case "multiple_choice":
        answer = selectedAnswer as string;
        correct = answer === question.correctAnswer;
        break;
      case "number_input":
        answer = Number(selectedAnswer);
        correct = answer === question.correctAnswer;
        break;
      case "slider":
        answer = sliderValue[0];
        const target = question.correctAnswer as number;
        const tolerance = (question.range?.max || 100) * 0.1; // 10% tolerance
        correct = Math.abs(answer - target) <= tolerance;
        break;
      case "matching":
        // For matching, check if all pairs are correct
        const correctPairs = question.pairs?.left.length || 0;
        const correctMatches = Object.keys(matching).filter(
          key => matching[key] === question.pairs?.right[question.pairs.left.indexOf(key)]
        ).length;
        correct = correctMatches === correctPairs;
        answer = JSON.stringify(matching);
        break;
    }

    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(answer, correct);
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <div className="space-y-3">
            <p className="text-lg font-medium mb-6">{question.question}</p>
            <div className="grid gap-3">
              {question.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="h-16 text-left justify-start text-wrap p-4"
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "number_input":
        return (
          <div className="space-y-6">
            <p className="text-lg font-medium">{t('question.typeAnswer')}</p>
            <div className="text-center">
              <div className="text-4xl font-bold mb-6 text-primary">
                {question.question}
              </div>
              <Input
                type="number"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="text-center text-2xl h-16 text-success border-2 border-success"
                placeholder="?"
              />
            </div>
            
            {/* Number pad */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="h-12 text-lg"
                  onClick={() => setSelectedAnswer(prev => prev + num.toString())}
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-12 text-lg"
                onClick={() => setSelectedAnswer(prev => prev.toString().slice(0, -1))}
              >
                ⌫
              </Button>
            </div>
          </div>
        );

      case "slider":
        return (
          <div className="space-y-6">
            <p className="text-lg font-medium">{t('question.getAsClose')}</p>
            <div className="text-center">
              <div className="text-4xl font-bold mb-8 text-primary">
                {question.question}
              </div>
              <div className="px-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{question.range?.min || 0}</span>
                  <span className="text-2xl font-bold text-success">{sliderValue[0]}</span>
                  <span>{question.range?.max || 100}</span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={question.range?.max || 100}
                  min={question.range?.min || 0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case "matching":
        return (
          <div className="space-y-6">
            <p className="text-lg font-medium">{t('question.matchPairs')}</p>
            <div className="grid grid-cols-2 gap-4">
              {question.pairs?.left.map((leftItem, index) => (
                <div key={index} className="flex gap-2">
                  <Card className="flex-1 p-4 text-center cursor-pointer hover:bg-muted/50"
                        onClick={() => setMatching(prev => ({ ...prev, [leftItem]: "" }))}>
                    <div className="text-lg">{leftItem}</div>
                  </Card>
                  <Card className="flex-1 p-4 text-center cursor-pointer hover:bg-muted/50">
                    <div className="text-lg">
                      {matching[leftItem] || "?"}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {question.pairs?.right.map((rightItem, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-12"
                  onClick={() => {
                    // Find first unmatched left item
                    const unmatched = question.pairs?.left.find(left => !matching[left]);
                    if (unmatched) {
                      setMatching(prev => ({ ...prev, [unmatched]: rightItem }));
                    }
                  }}
                >
                  {rightItem}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-warning" />
          <span className="font-bold text-lg">{streak} IN A ROW</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(hearts)].map((_, i) => (
            <Heart key={i} className="w-5 h-5 text-red-500 fill-current" />
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <Progress 
          value={(questionNumber / totalQuestions) * 100} 
          className="h-3 bg-muted" 
        />
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {t('quiz.question')} {questionNumber} {t('quiz.of')} {totalQuestions}
        </div>
      </div>

      {/* Question Card */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          {renderQuestionContent()}
          
          {showResult && (
            <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-success/10 border border-success' : 'bg-destructive/10 border border-destructive'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <span className="font-semibold">
                  {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                </span>
              </div>
              {question.explanation && (
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              )}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            {!showResult ? (
              <Button 
                onClick={handleSubmit}
                disabled={!selectedAnswer && question.type !== "slider" && Object.keys(matching).length === 0}
                className="w-full h-12 text-lg bg-success hover:bg-success/90"
              >
                {t('common.check')}
              </Button>
            ) : (
              <Button 
                onClick={() => setShowResult(false)}
                className="w-full h-12 text-lg bg-success hover:bg-success/90"
              >
                {t('common.continue')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};