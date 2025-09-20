import React, { useState } from 'react';
import { Image, FileText, Sparkles, Copy, ExternalLink, Camera, Upload } from 'lucide-react';
import { generateLinkedInPost } from '../../utils/linkedinGenerator';
import { mockEvents } from '../../utils/mockData';
import { User } from '../../types';

interface LinkedInGeneratorProps {
  user: User;
}

export const LinkedInGenerator: React.FC<LinkedInGeneratorProps> = ({ user }) => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);
  const [experience, setExperience] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'enthusiastic'>('professional');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<string>('');
  const [generatedPost, setGeneratedPost] = useState<string>('');

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setUploadedPhotos(prev => [...prev, url]);
    });
  };

  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCertificate(URL.createObjectURL(file));
    }
  };

  const generatePost = () => {
    const post = generateLinkedInPost(selectedEvent, experience, tone);
    setGeneratedPost(post);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
  };

  const shareToLinkedIn = () => {
    const encodedText = encodeURIComponent(generatedPost);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=&text=${encodedText}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">LinkedIn Content Generator</h1>
        <p className="text-gray-600">Create professional posts from your event experiences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Event Selection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Event</h3>
            <select
              value={selectedEvent.id}
              onChange={(e) => setSelectedEvent(mockEvents.find(event => event.id === e.target.value) || mockEvents[0])}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {mockEvents.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
            
            {/* Event Preview */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-4">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedEvent.title}</h4>
                  <p className="text-sm text-gray-600">{selectedEvent.date} • {selectedEvent.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Organized by {selectedEvent.organizer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Event Photos</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Click to upload event photos</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              
              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {uploadedPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Event photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Certificate Upload */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate (Optional)</h3>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 cursor-pointer transition-colors">
              <div className="text-center">
                <FileText className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <span className="text-sm text-gray-600">Upload certificate</span>
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleCertificateUpload}
                className="hidden"
              />
            </label>
            
            {certificate && (
              <div className="mt-4">
                <img
                  src={certificate}
                  alt="Certificate"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Experience Input */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Describe Your Experience</h3>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Share your key learnings, insights, and memorable moments from the event..."
              className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Tone Selection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Tone</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'professional', label: 'Professional', desc: 'Formal and business-focused' },
                { value: 'casual', label: 'Casual', desc: 'Friendly and approachable' },
                { value: 'enthusiastic', label: 'Enthusiastic', desc: 'Excited and energetic' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setTone(option.value as any)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    tone === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePost}
            disabled={!experience.trim()}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate LinkedIn Post
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Generated Post Preview */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated LinkedIn Post</h3>
            
            {generatedPost ? (
              <div className="space-y-4">
                {/* LinkedIn Post Mock */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-white">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">Software Developer</p>
                    </div>
                  </div>
                  
                  <div className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                    {generatedPost}
                  </div>
                  
                  {(uploadedPhotos.length > 0 || certificate) && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {uploadedPhotos.slice(0, 4).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Event photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                      {certificate && (
                        <img
                          src={certificate}
                          alt="Certificate"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className="flex-1 py-2 px-4 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Share on LinkedIn
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p>Fill in your experience and click "Generate" to create your LinkedIn post</p>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Be specific about your key learnings and takeaways</li>
              <li>• Include numbers and metrics when possible</li>
              <li>• Tag relevant people and organizations</li>
              <li>• Use 3-5 relevant hashtags for better reach</li>
              <li>• Add a call-to-action to encourage engagement</li>
              <li>• Photos with people get 2.3x more engagement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};