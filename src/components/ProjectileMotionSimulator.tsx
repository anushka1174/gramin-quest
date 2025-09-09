import { useRef, useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw, Target } from "lucide-react";

interface Projectile {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  active: boolean;
  time: number;
}

interface ProjectileMotionSimulatorProps {
  title: string;
  description: string;
}

export const ProjectileMotionSimulator = ({ title, description }: ProjectileMotionSimulatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Control states
  const [isPlaying, setIsPlaying] = useState(false);
  const [angle, setAngle] = useState([45]);
  const [velocity, setVelocity] = useState([20]);
  const [gravity, setGravity] = useState([9.8]);
  const [airResistance, setAirResistance] = useState([0]);
  const [mass, setMass] = useState([5]);
  
  // Visual options
  const [showTrajectory, setShowTrajectory] = useState(true);
  const [showVelocityVectors, setShowVelocityVectors] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  
  // Simulation state
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [nextId, setNextId] = useState(1);
  const [cannonX] = useState(80);
  const [cannonY] = useState(350);
  
  // Constants
  const SCALE = 10; // pixels per meter
  const TIME_STEP = 0.02; // seconds
  
  const launchProjectile = useCallback(() => {
    const angleRad = (angle[0] * Math.PI) / 180;
    const vx = velocity[0] * Math.cos(angleRad);
    const vy = -velocity[0] * Math.sin(angleRad); // negative because canvas y increases downward
    
    const newProjectile: Projectile = {
      id: nextId,
      x: cannonX,
      y: cannonY,
      vx,
      vy,
      trail: [{ x: cannonX, y: cannonY }],
      active: true,
      time: 0
    };
    
    setProjectiles(prev => [...prev, newProjectile]);
    setNextId(prev => prev + 1);
  }, [angle, velocity, nextId, cannonX, cannonY]);

  const updatePhysics = useCallback(() => {
    if (!isPlaying) return;
    
    setProjectiles(prev => 
      prev.map(projectile => {
        if (!projectile.active) return projectile;
        
        const airResistanceCoeff = airResistance[0] / 10000;
        const dragX = -airResistanceCoeff * projectile.vx * Math.abs(projectile.vx);
        const dragY = -airResistanceCoeff * projectile.vy * Math.abs(projectile.vy);
        
        const ax = dragX / mass[0];
        const ay = gravity[0] + (dragY / mass[0]);
        
        const newVx = projectile.vx + ax * TIME_STEP;
        const newVy = projectile.vy + ay * TIME_STEP;
        
        const newX = projectile.x + newVx * TIME_STEP * SCALE;
        const newY = projectile.y + newVy * TIME_STEP * SCALE;
        const newTime = projectile.time + TIME_STEP;
        
        // Check bounds
        const isActive = newX < 750 && newY < 400 && newY > 0;
        
        const newTrail = showTrajectory 
          ? [...projectile.trail, { x: newX, y: newY }].slice(-100)
          : [];
        
        return {
          ...projectile,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          trail: newTrail,
          active: isActive,
          time: newTime
        };
      }).filter(p => p.active || p.trail.length > 0)
    );
  }, [isPlaying, gravity, airResistance, mass, showTrajectory]);

  const drawScene = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += SCALE * 5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += SCALE * 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
    
    // Draw ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, height - 50, width, 50);
    
    // Draw cannon
    const angleRad = (angle[0] * Math.PI) / 180;
    ctx.save();
    ctx.translate(cannonX, cannonY);
    
    // Cannon base
    ctx.fillStyle = '#4A4A4A';
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Cannon barrel
    ctx.rotate(-angleRad);
    ctx.fillStyle = '#2A2A2A';
    ctx.fillRect(0, -8, 40, 16);
    ctx.restore();
    
    // Draw projectiles and trails
    projectiles.forEach(projectile => {
      // Draw trail
      if (showTrajectory && projectile.trail.length > 1) {
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(projectile.trail[0].x, projectile.trail[0].y);
        for (let i = 1; i < projectile.trail.length; i++) {
          ctx.lineTo(projectile.trail[i].x, projectile.trail[i].y);
        }
        ctx.stroke();
      }
      
      // Draw projectile
      if (projectile.active) {
        ctx.fillStyle = '#FF4444';
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#CC0000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw velocity vector
        if (showVelocityVectors) {
          const vectorScale = 2;
          ctx.strokeStyle = '#00AA00';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(projectile.x, projectile.y);
          ctx.lineTo(
            projectile.x + projectile.vx * vectorScale,
            projectile.y + projectile.vy * vectorScale
          );
          ctx.stroke();
          
          // Arrow head
          const headLen = 8;
          const headAngle = Math.atan2(projectile.vy, projectile.vx);
          ctx.beginPath();
          ctx.moveTo(
            projectile.x + projectile.vx * vectorScale,
            projectile.y + projectile.vy * vectorScale
          );
          ctx.lineTo(
            projectile.x + projectile.vx * vectorScale - headLen * Math.cos(headAngle - Math.PI / 6),
            projectile.y + projectile.vy * vectorScale - headLen * Math.sin(headAngle - Math.PI / 6)
          );
          ctx.moveTo(
            projectile.x + projectile.vx * vectorScale,
            projectile.y + projectile.vy * vectorScale
          );
          ctx.lineTo(
            projectile.x + projectile.vx * vectorScale - headLen * Math.cos(headAngle + Math.PI / 6),
            projectile.y + projectile.vy * vectorScale - headLen * Math.sin(headAngle + Math.PI / 6)
          );
          ctx.stroke();
        }
      }
    });
    
    // Draw angle indicator
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cannonX, cannonY, 35, 0, -angleRad, true);
    ctx.stroke();
    
    // Draw angle text
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText(`${angle[0]}°`, cannonX + 40, cannonY - 20);
  }, [angle, projectiles, showTrajectory, showVelocityVectors, showGrid, cannonX, cannonY]);

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
  }, [updatePhysics, drawScene]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setIsPlaying(false);
    setProjectiles([]);
    setNextId(1);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 {title}
          </CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg bg-gray-50 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={750}
              height={400}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={togglePlay} className="bg-gradient-primary">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button onClick={launchProjectile} variant="secondary">
              <Target className="w-4 h-4 mr-2" />
              Fire
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Launch Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Angle: {angle[0]}°</Label>
              <Slider
                value={angle}
                onValueChange={setAngle}
                max={90}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Initial Velocity: {velocity[0]} m/s</Label>
              <Slider
                value={velocity}
                onValueChange={setVelocity}
                max={50}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Mass: {mass[0]} kg</Label>
              <Slider
                value={mass}
                onValueChange={setMass}
                max={20}
                min={1}
                step={0.5}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Environment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Gravity: {gravity[0]} m/s²</Label>
              <Slider
                value={gravity}
                onValueChange={setGravity}
                max={20}
                min={0}
                step={0.1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Air Resistance: {airResistance[0]}</Label>
              <Slider
                value={airResistance}
                onValueChange={setAirResistance}
                max={100}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Visual Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="trajectory">Show Trajectory</Label>
              <Switch
                id="trajectory"
                checked={showTrajectory}
                onCheckedChange={setShowTrajectory}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="vectors">Show Velocity Vectors</Label>
              <Switch
                id="vectors"
                checked={showVelocityVectors}
                onCheckedChange={setShowVelocityVectors}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="grid">Show Grid</Label>
              <Switch
                id="grid"
                checked={showGrid}
                onCheckedChange={setShowGrid}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Physics Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <strong>Range Formula:</strong> R = (v₀² sin(2θ)) / g
            </div>
            <div className="text-sm">
              <strong>Max Height:</strong> h = (v₀² sin²(θ)) / (2g)
            </div>
            <div className="text-sm">
              <strong>Time of Flight:</strong> t = (2v₀ sin(θ)) / g
            </div>
            <div className="text-sm space-y-1 pt-2 border-t">
              <div>Theoretical Range: {((velocity[0] ** 2 * Math.sin(2 * angle[0] * Math.PI / 180)) / gravity[0]).toFixed(1)} m</div>
              <div>Max Height: {((velocity[0] ** 2 * Math.sin(angle[0] * Math.PI / 180) ** 2) / (2 * gravity[0])).toFixed(1)} m</div>
              <div>Flight Time: {((2 * velocity[0] * Math.sin(angle[0] * Math.PI / 180)) / gravity[0]).toFixed(1)} s</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};