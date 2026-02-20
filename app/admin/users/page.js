'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Mail, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  User,
  Shield,
  Clock
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingUser, setUpdatingUser] = useState(null);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set('search', searchTerm);
      }
      
      const queryString = params.toString();
      const url = `/api/admin/users${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users || []);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Toggle user status
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      setUpdatingUser(userId);
      
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isActive: !currentStatus }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isActive: !currentStatus } : user
        ));
      } else {
        alert(data.message || 'Failed to update user');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setUpdatingUser(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AdminLayout>
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Users</h1>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Manage registered users</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs bg-white px-2 py-1 rounded border border-gray-200">
            <Users className="w-3 h-3 text-[#52dd28ff]" />
            <span className="font-medium text-gray-900">{users.length}</span>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-7 sm:pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#52dd28ff] focus:border-[#52dd28ff] bg-white"
          />
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#52dd28ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-8 h-8 bg-[#52dd28ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-semibold text-[#52dd28ff]">
                        {getInitials(user.name)}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-xs font-semibold text-gray-900 truncate">{user.name}</h3>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Mail className="w-2 h-2" />
                        {user.email}
                      </p>
                      <p className="text-[8px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-2 h-2" />
                        Joined {formatDate(user.createdAt)}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                      disabled={updatingUser === user.id}
                      className={`px-2 py-1 text-[8px] font-medium rounded whitespace-nowrap ${
                        user.isActive
                          ? 'text-red-600 bg-red-50 border border-red-200'
                          : 'text-green-600 bg-green-50 border border-green-200'
                      } disabled:opacity-50`}
                    >
                      {updatingUser === user.id ? '...' : (user.isActive ? 'Deactivate' : 'Activate')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}