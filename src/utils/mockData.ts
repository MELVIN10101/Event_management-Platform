import { User, Event, Badge, SharedFile, Feedback } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Priya Krishnan',
  email: 'priya.krishnan@email.com',
  role: 'user',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design'],
  interests: ['Web Development', 'AI/ML', 'Startup Culture', 'Tech Leadership'],
  careerStage: 'mid',
  eventsAttended: 12,
  badges: [
    {
      id: '1',
      name: 'Top Attendee',
      description: 'Attended 10+ events',
      icon: 'Trophy',
      color: 'text-yellow-500'
    },
    {
      id: '2',
      name: 'Community Contributor',
      description: 'Shared 5+ files with community',
      icon: 'Users',
      color: 'text-blue-500'
    }
  ],
  preferredLanguage: 'en'
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Advanced Patterns Workshop',
    description: 'Deep dive into advanced React patterns including render props, compound components, and hooks patterns.',
    date: '2025-01-15',
    time: '09:00 AM',
    location: 'Chennai Tech Hub',
    type: 'workshop',
    skills: ['React', 'JavaScript', 'Frontend Development'],
    level: 'advanced',
    attendees: 45,
    maxAttendees: 60,
    rating: 4.8,
    organizer: 'TechEvents Chennai',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
    matchScore: 95,
    attendanceProbability: 87
  },
  {
    id: '2',
    title: 'AI/ML Career Networking Meetup',
    description: 'Connect with AI/ML professionals and explore career opportunities in the field.',
    date: '2025-01-18',
    time: '06:30 PM',
    location: 'Coimbatore Innovation Center',
    type: 'networking',
    skills: ['Machine Learning', 'Python', 'Data Science'],
    level: 'intermediate',
    attendees: 78,
    maxAttendees: 100,
    rating: 4.6,
    organizer: 'AI Chennai',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
    matchScore: 89,
    attendanceProbability: 92
  },
  {
    id: '3',
    title: 'Startup Pitch Competition 2025',
    description: 'Present your startup idea to a panel of investors and industry experts.',
    date: '2025-01-22',
    time: '10:00 AM',
    location: 'Madurai Startup Hub',
    type: 'conference',
    skills: ['Business Development', 'Pitch Presentation', 'Entrepreneurship'],
    level: 'intermediate',
    attendees: 120,
    maxAttendees: 150,
    rating: 4.7,
    organizer: 'Tamil Nadu Startup Mission',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
    matchScore: 72,
    attendanceProbability: 65
  },
  {
    id: '4',
    title: 'Full Stack Development Bootcamp',
    description: 'Comprehensive 3-day bootcamp covering modern full-stack development technologies.',
    date: '2025-01-25',
    time: '09:00 AM',
    location: 'Trichy Tech Park',
    type: 'workshop',
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    level: 'beginner',
    attendees: 32,
    maxAttendees: 40,
    rating: 4.9,
    organizer: 'CodeCraft Academy',
    image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
    matchScore: 91,
    attendanceProbability: 78
  },
  {
    id: '5',
    title: 'Women in Tech Leadership Summit',
    description: 'Empowering women leaders in technology with inspiring talks and networking opportunities.',
    date: '2025-01-28',
    time: '02:00 PM',
    location: 'Salem Convention Center',
    type: 'conference',
    skills: ['Leadership', 'Tech Management', 'Career Development'],
    level: 'intermediate',
    attendees: 95,
    maxAttendees: 120,
    rating: 4.8,
    organizer: 'Women Tech Leaders TN',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
    matchScore: 85,
    attendanceProbability: 88
  }
];

export const mockSharedFiles: SharedFile[] = [
  {
    id: '1',
    name: 'React Patterns Presentation.pdf',
    type: 'presentation',
    url: '#',
    uploadedBy: 'John Doe',
    eventId: '1',
    uploadDate: '2025-01-10',
    comments: [
      {
        id: '1',
        userId: '2',
        userName: 'Sarah Wilson',
        content: 'Great presentation! Really helped understand compound components.',
        date: '2025-01-11'
      }
    ]
  },
  {
    id: '2',
    name: 'Event Photo - Group Discussion.jpg',
    type: 'photo',
    url: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    uploadedBy: 'Mike Johnson',
    eventId: '1',
    uploadDate: '2025-01-12',
    comments: []
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    userId: '1',
    eventId: '1',
    rating: 5,
    comment: 'Excellent workshop with hands-on exercises. Learned a lot about advanced React patterns.',
    suggestions: 'Maybe include more real-world examples.',
    date: '2025-01-10'
  }
];