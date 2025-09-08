import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Users, Award, Globe, Target, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

const teamMembers = [
  {
    name: "Dr. Priya Sharma",
    role: "Education Director",
    description: "Former NCERT curriculum designer with 15+ years in educational technology",
    icon: Award
  },
  {
    name: "Rohit Kumar",
    role: "Lead Developer",
    description: "Full-stack developer passionate about making education accessible",
    icon: Lightbulb
  },
  {
    name: "Anjali Gupta",
    role: "Content Creator",
    description: "Physics teacher turned content creator, specializing in interactive learning",
    icon: Users
  },
  {
    name: "Vikram Singh",
    role: "UX Designer",
    description: "Designing intuitive learning experiences for rural students",
    icon: Heart
  }
];

const features = [
  {
    title: "Gamified Learning",
    description: "Make education fun with points, achievements, and friendly competition",
    icon: Award
  },
  {
    title: "NCERT Aligned",
    description: "Content perfectly aligned with Indian education standards",
    icon: Target
  },
  {
    title: "Multilingual Support",
    description: "Learn in English or Hindi for better comprehension",
    icon: Globe
  },
  {
    title: "Interactive Simulations",
    description: "Hands-on physics and chemistry labs in your browser",
    icon: Lightbulb
  }
];

export default function AboutPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About EduQuest</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Empowering rural students across India with world-class education through 
              gamified learning, interactive content, and cutting-edge technology.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="space-y-16">
          
          {/* Mission Statement */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe every student deserves access to quality education, regardless of their location. 
              Our platform bridges the educational gap between urban and rural areas by providing 
              engaging, interactive, and culturally relevant learning experiences.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary">100K+</div>
                <div className="text-muted-foreground">Students Reached</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-success">500+</div>
                <div className="text-muted-foreground">Rural Schools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-warning">95%</div>
                <div className="text-muted-foreground">Student Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2023 by a team of educators and technologists, EduQuest was born 
                  from a simple observation: rural students in India had immense potential but 
                  lacked access to quality educational resources.
                </p>
                <p>
                  We started with a small pilot program in 10 schools in Rajasthan. The 
                  response was overwhelming - students were more engaged, teachers reported 
                  better learning outcomes, and parents saw a positive change in their 
                  children's attitude towards education.
                </p>
                <p>
                  Today, we serve over 100,000 students across 500+ schools in rural India, 
                  making quality education accessible to those who need it most.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-success/10 rounded-2xl p-8">
              <div className="text-center space-y-6">
                <div className="text-6xl">🚀</div>
                <h3 className="text-2xl font-bold">Transforming Education</h3>
                <p className="text-muted-foreground">
                  Making learning engaging, accessible, and effective for every student
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                      <member.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <div className="text-sm text-primary font-medium">{member.role}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Education should be available to everyone, everywhere
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  Learning is better when we do it together
                </p>
              </div>
              <div className="text-center">
                <Lightbulb className="w-12 h-12 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Constantly improving how we teach and learn
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-gradient-primary text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're an educator, parent, or supporter of quality education, 
              we'd love to hear from you.
            </p>
            <div className="space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate("/help")}
              >
                Contact Us
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white hover:text-primary"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}