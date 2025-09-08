import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

interface PhysicsSimulationProps {
  title: string;
  description: string;
}

export const PhysicsSimulation = ({ title, description }: PhysicsSimulationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [force, setForce] = useState([50]);
  const [mass, setMass] = useState([10]);
  
  // Simple physics simulation state
  const [ball, setBall] = useState({
    x: 100,
    y: 300,
    vx: 0,
    vy: 0,
    radius: 20,
  });

  const drawScene = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = "#f0f4f8";
    ctx.fillRect(0, 0, width, height);
    
    // Draw ground
    ctx.fillStyle = "#4a5568";
    ctx.fillRect(0, height - 50, width, 50);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#3182ce";
    ctx.fill();
    ctx.strokeStyle = "#2c5282";
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw force arrow
    if (force[0] > 0) {
      ctx.beginPath();
      ctx.moveTo(ball.x, ball.y);
      ctx.lineTo(ball.x + force[0] * 2, ball.y);
      ctx.strokeStyle = "#e53e3e";
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(ball.x + force[0] * 2, ball.y);
      ctx.lineTo(ball.x + force[0] * 2 - 10, ball.y - 5);
      ctx.lineTo(ball.x + force[0] * 2 - 10, ball.y + 5);
      ctx.closePath();
      ctx.fillStyle = "#e53e3e";
      ctx.fill();
    }
    
    // Draw velocity vector
    if (Math.abs(ball.vx) > 0.1) {
      ctx.beginPath();
      ctx.moveTo(ball.x, ball.y - ball.radius - 10);
      ctx.lineTo(ball.x + ball.vx * 10, ball.y - ball.radius - 10);
      ctx.strokeStyle = "#38a169";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  const updatePhysics = () => {
    if (!isPlaying) return;
    
    setBall(prevBall => {
      const acceleration = force[0] / mass[0];
      const newVx = prevBall.vx + acceleration * 0.016; // 60fps
      const newX = prevBall.x + newVx * 0.016 * 100;
      
      // Boundary collision
      let finalVx = newVx;
      let finalX = newX;
      
      if (newX <= ball.radius || newX >= 700 - ball.radius) {
        finalVx = -newVx * 0.8; // Some energy loss
        finalX = newX <= ball.radius ? ball.radius : 700 - ball.radius;
      }
      
      return {
        ...prevBall,
        x: finalX,
        vx: finalVx,
      };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const animate = () => {
      updatePhysics();
      drawScene(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, force, mass, ball]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setBall({
      x: 100,
      y: 300,
      vx: 0,
      vy: 0,
      radius: 20,
    });
  };

  return (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⚡ {title}
        </CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          className="border rounded-lg bg-gray-50 w-full"
        />
        
        <div className="flex items-center gap-4">
          <Button onClick={togglePlay} className="bg-gradient-primary">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Force: {force[0]}N</label>
            <Slider
              value={force}
              onValueChange={setForce}
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Mass: {mass[0]}kg</label>
            <Slider
              value={mass}
              onValueChange={setMass}
              max={50}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Newton's Second Law</h4>
          <p className="text-sm text-muted-foreground">
            F = ma → a = F/m = {force[0]}/{mass[0]} = {(force[0] / mass[0]).toFixed(2)} m/s²
          </p>
        </div>
      </CardContent>
    </Card>
  );
};