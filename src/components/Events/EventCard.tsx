import React from 'react';
import { Calendar, Clock, MapPin, Users, Star, TrendingUp, ExternalLink } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  showProbability?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onRegister, 
  showProbability = true 
}) => {
  const handleRegister = () => {
    if (onRegister) {
      onRegister(event.id);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-800';
      case 'meetup': return 'bg-purple-100 text-purple-800';
      case 'conference': return 'bg-indigo-100 text-indigo-800';
      case 'networking': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
            {event.type}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(event.level)}`}>
            {event.level}
          </span>
        </div>
        {event.matchScore && (
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs font-medium text-green-600">{event.matchScore}% match</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{event.title}</h3>
          <div className="flex items-center gap-1 text-yellow-500 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-700">{event.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{event.attendees}/{event.maxAttendees} attendees</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {event.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {event.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{event.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Probability and Actions */}
        <div className="flex items-center justify-between">
          {showProbability && event.attendanceProbability && (
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2 flex-1">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${event.attendanceProbability}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                {event.attendanceProbability}% likely to attend
              </span>
            </div>
          )}
          
          <div className="flex gap-2 ml-4">
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium flex items-center gap-2"
            >
              Register Now
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Organizer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Organized by <span className="font-medium text-gray-700">{event.organizer}</span>
          </p>
        </div>
      </div>
    </div>
  );
};