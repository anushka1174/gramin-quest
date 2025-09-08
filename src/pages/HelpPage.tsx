import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "Go to Settings > Account > Change Password. You'll need to enter your current password and then your new password twice to confirm."
  },
  {
    question: "Can I study offline?",
    answer: "Yes! Enable offline mode in Settings > Mobile App > Offline Mode. This will download lessons to your device for offline access."
  },
  {
    question: "How is my progress calculated?",
    answer: "Progress is based on completed lessons, quiz scores, and time spent studying. Each activity has different XP values based on difficulty and completion rate."
  },
  {
    question: "What happens if I lose my study streak?",
    answer: "Don't worry! You can start a new streak anytime. Streaks are meant to motivate daily learning, but missing a day doesn't affect your overall progress."
  },
  {
    question: "How do I change my language preference?",
    answer: "Use the language toggle in the top navigation bar or go to Settings > Language & Theme to switch between English and Hindi."
  },
  {
    question: "Can I compete with friends?",
    answer: "Yes! Check the Leaderboard to see how you rank against other students. You can also share your achievements on social media."
  },
  {
    question: "Are the study materials aligned with my syllabus?",
    answer: "Yes, all content is aligned with NCERT curriculum and Indian education standards for classes 8-12."
  },
  {
    question: "How do I unlock new achievements?",
    answer: "Achievements are unlocked by reaching specific milestones like completing lessons, maintaining streaks, or scoring high on quizzes. Check the Achievements page for details."
  }
];

export default function HelpPage() {
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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Help & Support</h1>
              <p className="text-white/90 text-lg">Get help with your learning journey</p>
            </div>
            
            <div className="text-center">
              <HelpCircle className="w-16 h-16 mx-auto mb-2" />
              <div className="text-sm opacity-80">We're here to help</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Search Help Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="What do you need help with?"
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-card transition-all duration-300">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Get instant help from our support team</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-card transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground">Send us a detailed message</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-card transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground">Call us for urgent issues</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Brief description of your issue" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Please describe your issue in detail..."
                  rows={6}
                />
              </div>
              
              <Button className="w-full bg-success hover:bg-success/90">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span>support@eduquest.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>+91 12345 67890</span>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  <span>24/7 Support Available</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Check your internet connection if content isn't loading</p>
                <p>• Update your browser for the best experience</p>
                <p>• Enable notifications to stay updated with your progress</p>
                <p>• Use headphones for better audio quality in video lessons</p>
                <p>• Take breaks every 30 minutes for optimal learning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}