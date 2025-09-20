import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from 'recharts';

const eventAttendanceData = [
  { month: 'Jul', events: 2 },
  { month: 'Aug', events: 4 },
  { month: 'Sep', events: 3 },
  { month: 'Oct', events: 5 },
  { month: 'Nov', events: 2 },
  { month: 'Dec', events: 6 },
  { month: 'Jan', events: 8 },
];

const skillDevelopmentData = [
  { skill: 'React', before: 60, after: 85 },
  { skill: 'Node.js', before: 45, after: 70 },
  { skill: 'Python', before: 70, after: 80 },
  { skill: 'ML', before: 30, after: 65 },
  { skill: 'UI/UX', before: 55, after: 75 },
];

const eventTypesData = [
  { name: 'Workshops', value: 8, color: '#3B82F6' },
  { name: 'Meetups', value: 5, color: '#8B5CF6' },
  { name: 'Conferences', value: 3, color: '#10B981' },
  { name: 'Networking', value: 2, color: '#F59E0B' },
];

const careerProgressData = [
  { month: 'Jul 2024', connections: 45, skills: 3, events: 2 },
  { month: 'Aug 2024', connections: 62, skills: 4, events: 6 },
  { month: 'Sep 2024', connections: 78, skills: 4, events: 9 },
  { month: 'Oct 2024', connections: 95, skills: 5, events: 14 },
  { month: 'Nov 2024', connections: 108, skills: 5, events: 16 },
  { month: 'Dec 2024', connections: 120, skills: 6, events: 20 },
  { month: 'Jan 2025', connections: 127, skills: 7, events: 22 },
];

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your career development journey and event participation</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Attendance Over Time */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={eventAttendanceData}>
              <defs>
                <linearGradient id="eventGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="events" 
                stroke="#3B82F6" 
                strokeWidth={2} 
                fill="url(#eventGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Development Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Development Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDevelopmentData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
              <YAxis type="category" dataKey="skill" stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px' 
                }} 
              />
              <Bar dataKey="before" fill="#E5E7EB" name="Before" />
              <Bar dataKey="after" fill="#10B981" name="After" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Event Types Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventTypesData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {eventTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Career Progress Timeline */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Growth Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={careerProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="connections" 
                stroke="#8B5CF6" 
                strokeWidth={2} 
                name="Connections"
              />
              <Line 
                type="monotone" 
                dataKey="skills" 
                stroke="#10B981" 
                strokeWidth={2} 
                name="Skills"
              />
              <Line 
                type="monotone" 
                dataKey="events" 
                stroke="#F59E0B" 
                strokeWidth={2} 
                name="Events"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Most Active Month</h4>
          <p className="text-2xl font-bold text-blue-700">January 2025</p>
          <p className="text-sm text-blue-600">8 events attended</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2">Top Skill Improvement</h4>
          <p className="text-2xl font-bold text-green-700">Machine Learning</p>
          <p className="text-sm text-green-600">+35 points increase</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-2">Network Growth</h4>
          <p className="text-2xl font-bold text-purple-700">+82 connections</p>
          <p className="text-sm text-purple-600">in the last 6 months</p>
        </div>
      </div>
    </div>
  );
};