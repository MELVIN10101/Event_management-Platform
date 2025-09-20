export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    events: 'Events',
    community: 'Community',
    analytics: 'Analytics',
    profile: 'Profile',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    upcomingEvents: 'Upcoming Events',
    recommendedEvents: 'Recommended for You',
    recentActivity: 'Recent Activity',
    skillProgress: 'Skill Progress',
    careerGoals: 'Career Goals',
    
    // Events
    allEvents: 'All Events',
    myEvents: 'My Events',
    registerNow: 'Register Now',
    viewDetails: 'View Details',
    attendanceProbability: 'Attendance Probability',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    upload: 'Upload',
    download: 'Download',
    share: 'Share',
    
    // Career Development
    careerTips: 'Career Tips',
    mentorship: 'Mentorship',
    learningPaths: 'Learning Paths',
    skillDevelopment: 'Skill Development',
  },
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    events: 'நிகழ்வுகள்',
    community: 'சமூகம்',
    analytics: 'பகுப்பாய்வு',
    profile: 'சுயவிவரம்',
    
    // Dashboard
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    upcomingEvents: 'வரவிருக்கும் நிகழ்வுகள்',
    recommendedEvents: 'உங்களுக்காக பரிந்துரைக்கப்பட்டவை',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    skillProgress: 'திறமை முன்னேற்றம்',
    careerGoals: 'தொழில் இலக்குகள்',
    
    // Events
    allEvents: 'அனைத்து நிகழ்வுகள்',
    myEvents: 'எனது நிகழ்வுகள்',
    registerNow: 'இப்போது பதிவு செய்யுங்கள்',
    viewDetails: 'விபரங்களைப் பார்க்க',
    attendanceProbability: 'பங்கேற்பு சாத்தியக்கூறு',
    
    // Common
    search: 'தேடல்',
    filter: 'வடிகட்டி',
    loading: 'ஏற்றுகிறது...',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    submit: 'சமர்ப்பி',
    upload: 'பதிவேற்று',
    download: 'பதிவிறக்கு',
    share: 'பகிரு',
    
    // Career Development
    careerTips: 'தொழில் ஆலோசனைகள்',
    mentorship: 'வழிகாட்டுதல்',
    learningPaths: 'கற்றல் பாதைகள்',
    skillDevelopment: 'திறமை வளர்ச்சி',
  }
};

export const useTranslation = (language: 'en' | 'ta') => {
  return (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };
};