import { User, Event } from '../types';

export const calculateMatchScore = (user: User, event: Event): number => {
  let score = 0;
  
  // Skill matching (40% weight)
  const skillMatches = event.skills.filter(skill => 
    user.skills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );
  score += (skillMatches.length / event.skills.length) * 40;
  
  // Career stage matching (30% weight)
  const stageMapping = {
    'student': ['beginner'],
    'junior': ['beginner', 'intermediate'],
    'mid': ['intermediate', 'advanced'],
    'senior': ['advanced'],
    'executive': ['advanced']
  };
  
  if (stageMapping[user.careerStage]?.includes(event.level)) {
    score += 30;
  }
  
  // Event type preference (20% weight)
  const typePreferences = {
    'student': ['workshop', 'meetup'],
    'junior': ['workshop', 'conference'],
    'mid': ['conference', 'networking'],
    'senior': ['conference', 'networking'],
    'executive': ['networking', 'conference']
  };
  
  if (typePreferences[user.careerStage]?.includes(event.type)) {
    score += 20;
  }
  
  // Location bonus (10% weight)
  score += 10; // Assuming all events are in preferred locations
  
  return Math.min(100, Math.round(score));
};

export const calculateAttendanceProbability = (user: User, event: Event, matchScore: number): number => {
  let probability = matchScore * 0.4; // Base on match score
  
  // Historical attendance rate
  const attendanceRate = user.eventsAttended > 0 ? Math.min(user.eventsAttended / 20 * 100, 100) : 50;
  probability += attendanceRate * 0.3;
  
  // Event popularity
  const popularityScore = (event.attendees / event.maxAttendees) * 100;
  probability += popularityScore * 0.2;
  
  // Rating influence
  probability += (event.rating / 5) * 10;
  
  return Math.min(100, Math.round(probability));
};