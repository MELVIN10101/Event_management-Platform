import React, { useState } from 'react';
import { Upload, FileText, Image, Award, MessageCircle, Heart, Share, Download } from 'lucide-react';
import { SharedFile, Comment, User } from '../../types';
import { mockSharedFiles } from '../../utils/mockData';

interface CommunityHubProps {
  user: User;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ user }) => {
  const [files, setFiles] = useState<SharedFile[]>(mockSharedFiles);
  const [activeTab, setActiveTab] = useState<'all' | 'presentations' | 'photos' | 'certificates'>('all');
  const [newComment, setNewComment] = useState<{ [fileId: string]: string }>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFile: SharedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.includes('image') ? 'photo' : 'presentation',
        url: URL.createObjectURL(file),
        uploadedBy: user.name,
        eventId: '1',
        uploadDate: new Date().toISOString(),
        comments: []
      };
      setFiles([newFile, ...files]);
    }
  };

  const addComment = (fileId: string) => {
    if (!newComment[fileId]?.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      content: newComment[fileId],
      date: new Date().toISOString()
    };

    setFiles(files.map(file => 
      file.id === fileId 
        ? { ...file, comments: [...file.comments, comment] }
        : file
    ));

    setNewComment({ ...newComment, [fileId]: '' });
  };

  const filteredFiles = files.filter(file => {
    if (activeTab === 'all') return true;
    if (activeTab === 'presentations') return file.type === 'presentation';
    if (activeTab === 'photos') return file.type === 'photo';
    if (activeTab === 'certificates') return file.type === 'certificate';
    return false;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'photo': return Image;
      case 'certificate': return Award;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Hub</h1>
          <p className="text-gray-600">Share and collaborate with fellow learners</p>
        </div>
        
        {/* Upload Button */}
        <div>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload File
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.docx,.pptx,.jpg,.jpeg,.png"
            />
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Files', count: files.length },
            { id: 'presentations', label: 'Presentations', count: files.filter(f => f.type === 'presentation').length },
            { id: 'photos', label: 'Photos', count: files.filter(f => f.type === 'photo').length },
            { id: 'certificates', label: 'Certificates', count: files.filter(f => f.type === 'certificate').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFiles.map((file) => {
          const FileIcon = getFileIcon(file.type);
          
          return (
            <div key={file.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* File Preview */}
              {file.type === 'photo' ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <FileIcon className="w-16 h-16 text-blue-500" />
                </div>
              )}

              {/* File Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{file.name}</h3>
                    <p className="text-sm text-gray-600">
                      Uploaded by {file.uploadedBy} • {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span>{file.comments.length} comments</span>
                  </div>

                  {/* Existing Comments */}
                  <div className="space-y-3 max-h-32 overflow-y-auto">
                    {file.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {comment.userName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="font-medium text-sm text-gray-900">{comment.userName}</p>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(comment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment[file.id] || ''}
                        onChange={(e) => setNewComment({ ...newComment, [file.id]: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && addComment(file.id)}
                      />
                      <button
                        onClick={() => addComment(file.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No files yet</h3>
          <p className="text-gray-400">Be the first to share something with the community!</p>
        </div>
      )}
    </div>
  );
};