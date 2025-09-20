import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { EventsList } from './components/Events/EventsList';
import { CommunityHub } from './components/Community/CommunityHub';
import { AnalyticsCharts } from './components/Analytics/AnalyticsCharts';
import { LinkedInGenerator } from './components/LinkedIn/LinkedInGenerator';
import { mockUser, mockEvents } from './utils/mockData';
import { User } from './types';
import { calculateMatchScore, calculateAttendanceProbability } from './utils/recommendations';

function App() {
  const [user, setUser] = useState<User>(mockUser);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'ta') => {
    setUser(prev => ({ ...prev, preferredLanguage: lang }));
  };

  const handleEventRegister = (eventId: string) => {
    // Simulate event registration
    console.log(`Registered for event: ${eventId}`);
    // In a real app, this would make an API call
  };

  // Process events with recommendations
  const enhancedEvents = mockEvents.map(event => {
    const matchScore = calculateMatchScore(user, event);
    const attendanceProbability = calculateAttendanceProbability(user, event, matchScore);
    return {
      ...event,
      matchScore,
      attendanceProbability
    };
  });

  const upcomingEvents = enhancedEvents.filter(event => new Date(event.date) > new Date());
  const recommendedEvents = enhancedEvents
    .filter(event => (event.matchScore || 0) > 70)
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview
            user={user}
            upcomingEvents={upcomingEvents}
            recommendedEvents={recommendedEvents}
          />
        );
      case 'events':
        return (
          <EventsList
            user={user}
            events={mockEvents}
            onRegister={handleEventRegister}
          />
        );
      case 'community':
        return <CommunityHub user={user} />;
      case 'analytics':
        return <AnalyticsCharts />;
      case 'linkedin':
        return <LinkedInGenerator user={user} />;
      case 'career':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Career Development</h1>
              <p className="text-gray-600">Accelerate your professional growth</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Paths</h3>
                <p className="text-gray-600 text-sm mb-4">Structured pathways to advance your career</p>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Full-Stack Developer</h4>
                    <p className="text-blue-700 text-sm">12 courses • 6 months</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900">AI/ML Engineer</h4>
                    <p className="text-purple-700 text-sm">8 courses • 4 months</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentorship</h3>
                <p className="text-gray-600 text-sm mb-4">Connect with industry experts</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                      alt="Mentor"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Rajesh Kumar</p>
                      <p className="text-sm text-gray-600">Senior Full-Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Tips</h3>
                <p className="text-gray-600 text-sm mb-4">Daily insights to boost your career</p>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">"Build projects while learning to showcase your skills"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Achievements & Badges</h1>
              <p className="text-gray-600">Track your progress and celebrate milestones</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.badges.map(badge => (
                <div key={badge.id} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${badge.color === 'text-yellow-500' ? 'from-yellow-100 to-yellow-200' : 'from-blue-100 to-blue-200'}`}>
                    <span className={`text-2xl ${badge.color}`}>🏆</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'feedback':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Feedback System</h1>
              <p className="text-gray-600">Share your experience and help improve events</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Event Feedback</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">React Advanced Patterns Workshop</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Excellent workshop!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{user.role} • {user.careerStage} level</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardOverview user={user} upcomingEvents={upcomingEvents} recommendedEvents={recommendedEvents} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Header
        user={user}
        onLanguageChange={handleLanguageChange}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <Sidebar
          user={user}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
        />
        
        <main className="flex-1 lg:ml-0 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;