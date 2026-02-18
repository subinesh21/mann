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
  Clock,
  Eye
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

  // Format relative time
  const getRelativeTime = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return formatDate(dateString);
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
      <div className="space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-amado-dark mb-2">User Management</h1>
            <p className="text-amado-muted">Manage registered users (excluding admins)</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-amado-muted bg-white px-4 py-2 rounded-lg border border-amado-border">
            <div className="p-2 bg-amado-yellow/10 rounded-circle">
              <Users className="w-5 h-5 text-amado-yellow" />
            </div>
            <div>
              <span className="block font-semibold text-amado-dark">{users.length}</span>
              <span className="block">Total Users</span>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-md"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amado-gray w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-amado-border rounded-lg focus:ring-2 focus:ring-amado-yellow focus:border-amado-yellow transition-all duration-300 bg-amado-light placeholder:text-amado-muted"
          />
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-5 rounded-lg border border-amado-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-amado-yellow/10 rounded-circle">
                <Users className="w-6 h-6 text-amado-yellow" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-amado-muted uppercase tracking-wide">Total Users</p>
                <p className="text-2xl font-bold text-amado-dark">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg border border-amado-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-circle">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-amado-muted uppercase tracking-wide">Active Users</p>
                <p className="text-2xl font-bold text-amado-dark">{users.filter(u => u.isActive).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg border border-amado-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-circle">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-amado-muted uppercase tracking-wide">New This Month</p>
                <p className="text-2xl font-bold text-amado-dark">
                  {users.filter(u => {
                    const created = new Date(u.createdAt);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && 
                           created.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-amado-border overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-amado-border bg-amado-light">
            <h3 className="text-lg font-semibold text-amado-dark">User Directory</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amado-light border-b border-amado-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amado-dark uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      User
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amado-dark uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amado-dark uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amado-dark uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Last Login
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amado-dark uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Status
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-amado-dark uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-2">
                      <Eye className="w-4 h-4" />
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amado-border">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-amado-yellow border-t-transparent rounded-full animate-spin mr-4"></div>
                        <p className="text-amado-muted text-lg">Loading users...</p>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <div className="p-8">
                        <User className="w-16 h-16 text-amado-gray mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-amado-dark mb-2">No users found</h3>
                        <p className="text-amado-muted max-w-md mx-auto">
                          {searchTerm ? 'Try adjusting your search' : 'Users will appear here when they register'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-amado-light transition-colors duration-200"
                    >
                      {/* User Info */}
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-amado-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-amado-yellow font-semibold text-sm">
                              {getInitials(user.name)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="font-semibold text-amado-dark">{user.name}</p>
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-amado-light text-amado-dark rounded-full border border-amado-border">
                              <User className="w-3 h-3 mr-1 text-amado-gray" />
                              User
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-5">
                        <div className="flex items-center text-sm text-amado-dark">
                          <Mail className="w-4 h-4 mr-2 text-amado-gray" />
                          <span className="font-medium">{user.email}</span>
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-5">
                        <div className="flex items-center text-sm text-amado-dark">
                          <Calendar className="w-4 h-4 mr-2 text-amado-gray" />
                          <span className="font-medium">{formatDate(user.createdAt)}</span>
                        </div>
                      </td>

                      {/* Last Login */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-amado-muted font-medium">
                          {getRelativeTime(user.lastLogin)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {user.isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => toggleUserStatus(user.id, user.isActive)}
                          disabled={updatingUser === user.id}
                          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 border ${
                            user.isActive
                              ? 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100'
                              : 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100'
                          } disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto`}
                        >
                          {updatingUser === user.id ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Updating...
                            </span>
                          ) : (
                            user.isActive ? 'Deactivate' : 'Activate'
                          )}
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
