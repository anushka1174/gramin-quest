import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, BookOpen, Video, FileText, Download, Eye, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const resourceData = {
  notes: [
    {
      title: "Newton's Laws of Motion - Complete Guide",
      subject: "Physics",
      class: "Class 9",
      type: "PDF",
      size: "2.4 MB",
      downloads: 1250,
      rating: 4.8,
      preview: true
    },
    {
      title: "Chemical Bonding and Molecular Structure",
      subject: "Chemistry", 
      class: "Class 11",
      type: "PDF",
      size: "3.1 MB",
      downloads: 890,
      rating: 4.6,
      preview: true
    },
    {
      title: "Coordinate Geometry Formulas",
      subject: "Mathematics",
      class: "Class 10",
      type: "PDF",
      size: "1.8 MB",
      downloads: 2100,
      rating: 4.9,
      preview: true
    },
    {
      title: "Cell Structure and Functions",
      subject: "Biology",
      class: "Class 9",
      type: "PDF",
      size: "4.2 MB",
      downloads: 756,
      rating: 4.5,
      preview: true
    }
  ],
  videos: [
    {
      title: "Projectile Motion Explained",
      subject: "Physics",
      class: "Class 11",
      duration: "12:45",
      views: 15000,
      rating: 4.7,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Organic Chemistry Basics",
      subject: "Chemistry",
      class: "Class 11",
      duration: "18:30",
      views: 12000,
      rating: 4.6,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Trigonometry Applications",
      subject: "Mathematics",
      class: "Class 10",
      duration: "15:20",
      views: 18500,
      rating: 4.8,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Photosynthesis Process",
      subject: "Biology",
      class: "Class 10",
      duration: "14:15",
      views: 9500,
      rating: 4.5,
      thumbnail: "/placeholder.svg"
    }
  ],
  references: [
    {
      title: "NCERT Physics Class 12 Textbook",
      subject: "Physics",
      class: "Class 12",
      type: "Reference Book",
      publisher: "NCERT",
      year: 2023,
      rating: 4.9
    },
    {
      title: "RD Sharma Mathematics Class 10",
      subject: "Mathematics",
      class: "Class 10", 
      type: "Reference Book",
      publisher: "Dhanpat Rai",
      year: 2023,
      rating: 4.7
    },
    {
      title: "HC Verma Concepts of Physics",
      subject: "Physics",
      class: "Class 11-12",
      type: "Reference Book",
      publisher: "Bharati Bhawan",
      year: 2023,
      rating: 4.8
    },
    {
      title: "NCERT Biology Class 11",
      subject: "Biology",
      class: "Class 11",
      type: "Reference Book",
      publisher: "NCERT",
      year: 2023,
      rating: 4.6
    }
  ]
};

export default function LibraryPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = ["All", "Physics", "Chemistry", "Mathematics", "Biology", "Social Studies"];
  const classes = ["All", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      Physics: "bg-gradient-primary",
      Chemistry: "bg-gradient-secondary", 
      Mathematics: "bg-gradient-success",
      Biology: "bg-gradient-warning",
      "Social Studies": "bg-gradient-purple"
    };
    return colors[subject] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-purple text-white py-8">
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
              <h1 className="text-4xl font-bold mb-2">Digital Library</h1>
              <p className="text-white/90 text-lg">Access comprehensive study materials and resources</p>
            </div>
            
            <div className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-2" />
              <div className="text-sm opacity-80">1000+ Resources</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {subjects.map((subject) => (
              <Badge
                key={subject}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-white"
              >
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="notes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="notes">Study Notes</TabsTrigger>
            <TabsTrigger value="videos">Video Lectures</TabsTrigger>
            <TabsTrigger value="references">Reference Books</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resourceData.notes.map((note, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-card hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${getSubjectColor(note.subject)} text-white text-xs`}>
                            {note.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {note.class}
                          </Badge>
                        </div>
                      </div>
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{note.type} • {note.size}</span>
                      <span>⭐ {note.rating}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {note.downloads} downloads
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {note.preview && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      )}
                      <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resourceData.videos.map((video, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-card hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="relative">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Video className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getSubjectColor(video.subject)} text-white text-xs`}>
                        {video.subject}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {video.class}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views.toLocaleString()} views
                      </span>
                      <span>⭐ {video.rating}</span>
                    </div>
                    
                    <Button className="w-full bg-gradient-primary text-white">
                      <Video className="w-4 h-4 mr-2" />
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="references">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resourceData.references.map((book, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-card hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-20 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${getSubjectColor(book.subject)} text-white text-xs`}>
                            {book.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {book.class}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <div>Publisher: {book.publisher}</div>
                      <div>Year: {book.year}</div>
                      <div>Rating: ⭐ {book.rating}</div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}