import React, { useState } from 'react';
import { Bell, Search, User, Menu, Globe, ChevronDown } from 'lucide-react';
import { User as UserType } from '../../types';
import { useTranslation } from '../../utils/translations';

interface HeaderProps {
  user: UserType;
  onLanguageChange: (lang: 'en' | 'ta') => void;
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLanguageChange, onMenuToggle }) => {
  const t = useTranslation(user.preferredLanguage);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New React workshop available', time: '2h ago' },
    { id: 2, message: 'Event reminder: AI/ML Meetup tomorrow', time: '4h ago' },
    { id: 3, message: 'Your LinkedIn post was generated', time: '1d ago' }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CareerConnect TN
                </h1>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('search')}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:block text-sm">{user.preferredLanguage === 'en' ? 'EN' : 'தமிழ்'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setShowLangDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${user.preferredLanguage === 'en' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('ta');
                      setShowLangDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${user.preferredLanguage === 'ta' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    தமிழ்
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};