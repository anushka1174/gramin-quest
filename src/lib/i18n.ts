import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.subjects": "Subjects",
      "nav.profile": "Profile",
      "nav.settings": "Settings",
      
      // Common
      "common.back": "Back",
      "common.continue": "Continue",
      "common.start": "Start",
      "common.next": "Next",
      "common.complete": "Complete",
      "common.retry": "Retry",
      "common.check": "Check",
      "common.skip": "Skip",
      
      // Home page
      "home.title": "Choose Your Learning Adventure! 🚀",
      "home.subtitle": "Master subjects through fun games and interactive simulations",
      
      // Subjects
      "subjects.physics": "Physics",
      "subjects.chemistry": "Chemistry", 
      "subjects.mathematics": "Mathematics",
      "subjects.biology": "Biology",
      "subjects.socialStudies": "Social Studies",
      "subjects.english": "English",
      "subjects.computerScience": "Computer Science",
      "subjects.hindi": "Hindi",
      
      // Physics chapters
      "physics.motion": "Motion and Forces",
      "physics.energy": "Energy and Work",
      "physics.waves": "Waves and Sound",
      "physics.optics": "Light and Optics",
      
      // Activities
      "activity.lesson": "Lesson",
      "activity.simulation": "Simulation",
      "activity.quiz": "Quiz",
      "activity.completed": "Completed",
      
      // Quiz
      "quiz.question": "Question",
      "quiz.of": "of",
      "quiz.correct": "Correct!",
      "quiz.incorrect": "Incorrect",
      "quiz.tryAgain": "Try Again",
      "quiz.explanation": "Explanation",
      "quiz.nextQuestion": "Next Question",
      "quiz.finishQuiz": "Finish Quiz",
      
      // Question types
      "question.typeAnswer": "Type the answer",
      "question.selectAnswer": "Select the correct answer",
      "question.matchPairs": "Match the pairs",
      "question.getAsClose": "Get as close as you can",
      
      // Gamification
      "game.level": "Level",
      "game.xp": "XP",
      "game.streak": "day streak",
      "game.leaderboard": "Weekly Leaderboard",
      "game.achievements": "Achievements",
      "game.progress": "Progress",
      
      // Achievements
      "achievement.firstLesson": "First Lesson Complete",
      "achievement.weekStreak": "Week Streak",
      "achievement.perfectQuiz": "Perfect Quiz",
      "achievement.scholar": "Scholar",
      
      // Theme
      "theme.light": "Light",
      "theme.dark": "Dark",
      "theme.system": "System",
    }
  },
  hi: {
    translation: {
      // Navigation
      "nav.home": "होम",
      "nav.subjects": "विषय",
      "nav.profile": "प्रोफाइल",
      "nav.settings": "सेटिंग्स",
      
      // Common
      "common.back": "वापस",
      "common.continue": "जारी रखें",
      "common.start": "शुरू करें",
      "common.next": "अगला",
      "common.complete": "पूरा करें",
      "common.retry": "पुनः प्रयास",
      "common.check": "जांचें",
      "common.skip": "छोड़ें",
      
      // Home page
      "home.title": "अपना सीखने का रोमांच चुनें! 🚀",
      "home.subtitle": "मजेदार खेलों और इंटरैक्टिव सिमुलेशन के माध्यम से विषयों में महारत हासिल करें",
      
      // Subjects
      "subjects.physics": "भौतिकी",
      "subjects.chemistry": "रसायन विज्ञान",
      "subjects.mathematics": "गणित",
      "subjects.biology": "जीव विज्ञान",
      "subjects.socialStudies": "सामाजिक अध्ययन",
      "subjects.english": "अंग्रेजी",
      "subjects.computerScience": "कंप्यूटर विज्ञान",
      "subjects.hindi": "हिंदी",
      
      // Physics chapters
      "physics.motion": "गति और बल",
      "physics.energy": "ऊर्जा और कार्य",
      "physics.waves": "तरंगें और ध्वनि",
      "physics.optics": "प्रकाश और प्रकाशिकी",
      
      // Activities
      "activity.lesson": "पाठ",
      "activity.simulation": "सिमुलेशन",
      "activity.quiz": "प्रश्नोत्तरी",
      "activity.completed": "पूर्ण",
      
      // Quiz
      "quiz.question": "प्रश्न",
      "quiz.of": "में से",
      "quiz.correct": "सही!",
      "quiz.incorrect": "गलत",
      "quiz.tryAgain": "पुनः प्रयास करें",
      "quiz.explanation": "व्याख्या",
      "quiz.nextQuestion": "अगला प्रश्न",
      "quiz.finishQuiz": "प्रश्नोत्तरी समाप्त करें",
      
      // Question types
      "question.typeAnswer": "उत्तर टाइप करें",
      "question.selectAnswer": "सही उत्तर चुनें",
      "question.matchPairs": "जोड़े मिलाएं",
      "question.getAsClose": "जितना संभव हो उतना करीब पहुंचें",
      
      // Gamification
      "game.level": "स्तर",
      "game.xp": "अनुभव अंक",
      "game.streak": "दिन की लकीर",
      "game.leaderboard": "साप्ताहिक लीडरबोर्ड",
      "game.achievements": "उपलब्धियां",
      "game.progress": "प्रगति",
      
      // Achievements
      "achievement.firstLesson": "पहला पाठ पूरा",
      "achievement.weekStreak": "सप्ताह की लकीर",
      "achievement.perfectQuiz": "परफेक्ट प्रश्नोत्तरी",
      "achievement.scholar": "विद्वान",
      
      // Theme
      "theme.light": "हल्का",
      "theme.dark": "गहरा",
      "theme.system": "सिस्टम",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;