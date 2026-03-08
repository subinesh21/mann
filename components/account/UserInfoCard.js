'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'react-toastify';

export default function UserInfoCard({ user, onProfileUpdate }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        phone: '',
    });

    useEffect(() => {
        if (user?.id) {
            fetchProfile();
        }
    }, [user?.id]);

    useEffect(() => {
        if (!isEditing && user?.id) {
            fetchProfile();
        }
    }, [isEditing]);

    const fetchProfile = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/user/profile?userId=${user.id}`);
            const data = await response.json();

            if (response.ok && data.user) {
                setProfile(data.user);
                if (data.user.shippingAddress) {
                    setFormData(data.user.shippingAddress);
                }
            } else {
                // Initialize with user name
                setFormData(prev => ({
                    ...prev,
                    fullName: user.name || '',
                }));
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setFormData(prev => ({
                ...prev,
                fullName: user.name || '',
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName?.trim()) {
            toast.error('Please enter your full name');
            return;
        }
        if (!formData.phone?.trim()) {
            toast.error('Please enter your phone number');
            return;
        }
        if (!formData.address?.trim()) {
            toast.error('Please enter your address');
            return;
        }
        if (!formData.city?.trim()) {
            toast.error('Please enter your city');
            return;
        }
        if (!formData.state?.trim()) {
            toast.error('Please enter your state');
            return;
        }
        if (!formData.zipCode?.trim()) {
            toast.error('Please enter your ZIP code');
            return;
        }

        try {
            setSaving(true);

            const response = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    shippingAddress: formData,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setProfile(data.user);
                if (data.user.shippingAddress) {
                    setFormData(data.user.shippingAddress);
                }
                setIsEditing(false);
                toast.success('Shipping details updated successfully!');
                if (onProfileUpdate) onProfileUpdate();
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const hasAddress = !!(profile?.shippingAddress?.fullName?.trim() && profile?.shippingAddress?.address?.trim());

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-box shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 lg:mb-8 transition-all duration-300 hover:shadow-md"
        >
            {isEditing ? (
                <div>
                    <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Edit Shipping Details</h2>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                if (profile?.shippingAddress) {
                                    setFormData(profile.shippingAddress);
                                }
                            }}
                            className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-box focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-box focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                                    placeholder="10-digit mobile number"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                                Address *
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-box focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] resize-none transition-all duration-300 hover:border-gray-400"
                                placeholder="Street address, apartment, suite, etc."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-box focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                                    placeholder="City"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                                    State *
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-box focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                                    placeholder="State"
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                                    ZIP *
                                </label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-box focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                                    placeholder="ZIP"
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-3 sm:pt-4 lg:pt-5">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-[#52dd28ff] text-white font-medium py-2.5 sm:py-3 px-4 text-sm rounded-box hover:bg-[#45b824] transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md"
                            >
                                {saving ? 'Saving...' : 'Save Shipping Details'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-[#52dd28ff]/10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#52dd28ff] ">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 font-cinzel">{user?.name}</h2>
                            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 sm:gap-2 font-mono">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                                {user?.email}
                            </p>

                            <div className="mt-4 sm:mt-5 lg:mt-6 pt-4 sm:pt-5 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs sm:text-sm font-cinzel text-gray-700 flex items-center gap-1 sm:gap-2 uppercase tracking-wide">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Shipping Address
                                    </h3>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-xs sm:text-sm text-[#52dd28ff] hover:text-[#45b824] font-medium transition-colors"
                                    >
                                        {hasAddress ? 'Edit' : 'Add'}
                                    </button>
                                </div>

                                {loading ? (
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                        Loading...
                                    </div>
                                ) : hasAddress ? (
                                    <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 font-mono">
                                        <p className="font-medium text-gray-900 text-sm">{profile.shippingAddress.fullName}</p>
                                        <p>{profile.shippingAddress.address}</p>
                                        <p>{profile.shippingAddress.city}, {profile.shippingAddress.state} - {profile.shippingAddress.zipCode}</p>
                                        <p className="flex items-center gap-1 mt-1">
                                            <Phone className="w-3 h-3" />
                                            {profile.shippingAddress.phone}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-xs sm:text-sm text-gray-500">No shipping address added</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
