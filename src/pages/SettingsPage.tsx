import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, User, Bell, Globe, Palette, Volume2, Shield, Smartphone } from "lucide-react";
import { LanguageThemeToggle } from "@/components/LanguageThemeToggle";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-secondary text-white py-8">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-white/90 text-lg">Customize your learning experience</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg bg-background"
                    defaultValue="Priya Sharma"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">School Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg bg-background"
                  defaultValue="Central High School"
                />
              </div>
            </CardContent>
          </Card>

          {/* Language & Theme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Theme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <LanguageThemeToggle />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Study Reminders</div>
                  <div className="text-sm text-muted-foreground">Get reminded to study daily</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Achievement Notifications</div>
                  <div className="text-sm text-muted-foreground">Celebrate your milestones</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Leaderboard Updates</div>
                  <div className="text-sm text-muted-foreground">Weekly ranking changes</div>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Study Reminder Time</label>
                <Select defaultValue="18:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Sound Effects</div>
                  <div className="text-sm text-muted-foreground">Button clicks and notifications</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Background Music</div>
                  <div className="text-sm text-muted-foreground">Relaxing study music</div>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Volume Level</label>
                <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <Select defaultValue="intermediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Learning Style</label>
                <Select defaultValue="visual">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">Visual Learner</SelectItem>
                    <SelectItem value="auditory">Auditory Learner</SelectItem>
                    <SelectItem value="kinesthetic">Hands-on Learner</SelectItem>
                    <SelectItem value="reading">Reading/Writing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show Explanations</div>
                  <div className="text-sm text-muted-foreground">Display detailed explanations after answers</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto-advance</div>
                  <div className="text-sm text-muted-foreground">Automatically move to next question</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Share Progress</div>
                  <div className="text-sm text-muted-foreground">Allow others to see your learning progress</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-sm text-muted-foreground">Help improve the platform with usage data</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button variant="outline" className="w-full">
                Download My Data
              </Button>
            </CardContent>
          </Card>

          {/* Mobile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Mobile App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Offline Mode</div>
                  <div className="text-sm text-muted-foreground">Download lessons for offline access</div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Saver</div>
                  <div className="text-sm text-muted-foreground">Reduce data usage on mobile networks</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-6">
            <Button className="flex-1 bg-success hover:bg-success/90">
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}