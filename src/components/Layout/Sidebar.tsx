import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  User, 
  Settings,
  BookOpen,
  Trophy,
  FileText,
  MessageCircle
} from 'lucide-react';
import { User as UserType } from '../../types';
import { useTranslation } from '../../utils/translations';

interface SidebarProps {
  user: UserType;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onTabChange, isOpen }) => {
  const t = useTranslation(user.preferredLanguage);

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'events', label: t('events'), icon: Calendar },
    { id: 'community', label: t('community'), icon: Users },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
    { id: 'career', label: 'Career Development', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'linkedin', label: 'LinkedIn Generator', icon: FileText },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
  ];

  const adminItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: Settings },
    { id: 'manage-events', label: 'Manage Events', icon: Calendar },
    { id: 'user-management', label: 'User Management', icon: Users },
  ];

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-md border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto pt-6">
          <nav className="px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[1.02]' 
                      : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {(user.role === 'admin' || user.role === 'organizer') && (
            <div className="mt-8 px-4">
              <div className="border-t border-gray-200/50 pt-6">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Management
                </h3>
                <nav className="space-y-2">
                  {adminItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                          ${isActive 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-[1.02]' 
                            : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200/50 p-4">
          <button
            onClick={() => onTabChange('profile')}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
              ${activeTab === 'profile' 
                ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900'
              }
            `}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">{t('profile')}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};