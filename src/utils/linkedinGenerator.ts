import { Event } from '../types';

export const generateLinkedInPost = (
  event: Event,
  experience: string,
  tone: 'professional' | 'casual' | 'enthusiastic' = 'professional'
): string => {
  const toneTemplates = {
    professional: {
      opening: "I recently had the opportunity to attend",
      keyLearnings: "Key takeaways from the session:",
      closing: "Looking forward to applying these insights in my professional journey."
    },
    casual: {
      opening: "Just wrapped up an amazing",
      keyLearnings: "Some cool things I learned:",
      closing: "Great way to spend the day learning and networking!"
    },
    enthusiastic: {
      opening: "What an incredible experience at",
      keyLearnings: "Mind-blown by these insights:",
      closing: "Can't wait to implement these learnings! Who else was there?"
    }
  };
  
  const template = toneTemplates[tone];
  const hashtags = generateHashtags(event);
  
  return `${template.opening} ${event.title}! 🚀

${experience}

${template.keyLearnings}
• Practical ${event.skills.join(' & ')} techniques
• Networking with industry professionals
• Latest trends in ${event.type} development

${template.closing}

Thanks to ${event.organizer} for organizing such a valuable session.

${hashtags.map(tag => `#${tag}`).join(' ')}`;
};

export const generateHashtags = (event: Event): string[] => {
  const baseHashtags = ['TechEvents', 'CareerGrowth', 'Learning', 'Networking'];
  const skillHashtags = event.skills.map(skill => skill.replace(/\s+/g, ''));
  const typeHashtags = {
    'workshop': ['Workshop', 'HandsOn'],
    'meetup': ['Meetup', 'Community'],
    'conference': ['Conference', 'TechTalk'],
    'networking': ['Networking', 'Connections']
  };
  
  return [...baseHashtags, ...skillHashtags, ...typeHashtags[event.type], 'TamilNaduTech'];
};