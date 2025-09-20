import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { Event, User } from '../../types';
import { EventCard } from './EventCard';
import { calculateMatchScore, calculateAttendanceProbability } from '../../utils/recommendations';

interface EventsListProps {
  user: User;
  events: Event[];
  onRegister: (eventId: string) => void;
}

export const EventsList: React.FC<EventsListProps> = ({ user, events, onRegister }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'match' | 'probability'>('match');

  const enhancedEvents = useMemo(() => {
    return events.map(event => {
      const matchScore = calculateMatchScore(user, event);
      const attendanceProbability = calculateAttendanceProbability(user, event, matchScore);
      return {
        ...event,
        matchScore,
        attendanceProbability
      };
    });
  }, [events, user]);

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = enhancedEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || event.type === selectedType;
      const matchesLevel = selectedLevel === 'all' || event.level === selectedLevel;
      
      return matchesSearch && matchesType && matchesLevel;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'match':
          return (b.matchScore || 0) - (a.matchScore || 0);
        case 'probability':
          return (b.attendanceProbability || 0) - (a.attendanceProbability || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [enhancedEvents, searchTerm, selectedType, selectedLevel, sortBy]);

  const eventTypes = ['workshop', 'meetup', 'conference', 'networking'];
  const eventLevels = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Discover events tailored to your career goals</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              {filteredAndSortedEvents.length} events found
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Event Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            {eventLevels.map(level => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'match' | 'probability')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="match">Best Match</option>
            <option value="probability">Attendance Probability</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredAndSortedEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No events found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={onRegister}
              showProbability={true}
            />
          ))}
        </div>
      )}

      {/* Recommendation Insights */}
      {filteredAndSortedEvents.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">✨ Personalization Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">High Match Events</p>
                <p className="text-sm text-gray-600">
                  {filteredAndSortedEvents.filter(e => (e.matchScore || 0) > 80).length} events match your skills
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Attendance Prediction</p>
                <p className="text-sm text-gray-600">
                  Average {Math.round(filteredAndSortedEvents.reduce((acc, e) => acc + (e.attendanceProbability || 0), 0) / filteredAndSortedEvents.length)}% likelihood
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Local Events</p>
                <p className="text-sm text-gray-600">
                  {filteredAndSortedEvents.length} events in Tamil Nadu
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};