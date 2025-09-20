export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'organizer' | 'admin';
  avatar: string;
  skills: string[];
  interests: string[];
  careerStage: 'student' | 'junior' | 'mid' | 'senior' | 'executive';
  eventsAttended: number;
  badges: Badge[];
  preferredLanguage: 'en' | 'ta';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'meetup' | 'conference' | 'networking';
  skills: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  attendees: number;
  maxAttendees: number;
  rating: number;
  organizer: string;
  image: string;
  matchScore?: number;
  attendanceProbability?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Feedback {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  comment: string;
  suggestions: string;
  date: string;
}

export interface SharedFile {
  id: string;
  name: string;
  type: 'presentation' | 'photo' | 'document' | 'certificate';
  url: string;
  uploadedBy: string;
  eventId: string;
  uploadDate: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  date: string;
}

export interface LinkedInPost {
  content: string;
  hashtags: string[];
  tone: 'professional' | 'casual' | 'enthusiastic';
}