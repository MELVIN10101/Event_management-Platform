import React from 'react';
import { Calendar, Users, Trophy, TrendingUp, Target, BookOpen } from 'lucide-react';
import { User, Event } from '../../types';
import { useTranslation } from '../../utils/translations';

interface DashboardOverviewProps {
  user: User;
  upcomingEvents: Event[];
  recommendedEvents: Event[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  user, 
  upcomingEvents, 
  recommendedEvents 
}) => {
  const t = useTranslation(user.preferredLanguage);

  const stats = [
    {
      label: 'Events Attended',
      value: user.eventsAttended,
      change: '+12%',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Skills Acquired',
      value: user.skills.length,
      change: '+3',
      icon: BookOpen,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Network Connections',
      value: 127,
      change: '+8',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Badges Earned',
      value: user.badges.length,
      change: '+1',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full border-4 border-white/20"
          />
          <div>
            <h1 className="text-3xl font-bold">{t('welcomeBack')}, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-blue-100 mt-2">
              Ready to accelerate your career journey today?
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-green-300 text-sm">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Career Goals</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Track your progress towards your career milestones</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Full Stack Developer</span>
              <span className="text-sm font-medium text-blue-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Skill Progress</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Your learning journey this month</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">+3</span>
            <span className="text-sm text-gray-500">new skills</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Network Growth</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Professional connections made</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-600">+8</span>
            <span className="text-sm text-gray-500">this month</span>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('upcomingEvents')}</h3>
          <div className="space-y-4">
            {upcomingEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {event.attendanceProbability}% likely
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('recommendedEvents')}</h3>
          <div className="space-y-4">
            {recommendedEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {event.matchScore}% match
                    </span>
                    <span className="text-xs text-gray-500">{event.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('recentActivity')}</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-900 font-medium">Attended React Advanced Patterns Workshop</p>
              <p className="text-sm text-gray-500">Generated LinkedIn post • 2 days ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-900 font-medium">Earned "Community Contributor" badge</p>
              <p className="text-sm text-gray-500">Shared 5 files with community • 3 days ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-900 font-medium">Registered for AI/ML Networking Meetup</p>
              <p className="text-sm text-gray-500">Event on Jan 18, 2025 • 5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};