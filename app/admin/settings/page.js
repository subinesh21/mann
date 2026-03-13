'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings, Globe, Mail, Phone, MapPin,
    Shield, Share2, CreditCard, Save, RefreshCw,
    AlertTriangle, CheckCircle, Info, Instagram,
    Facebook, Twitter, Github, FileText
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'react-toastify';
import SafeImage from '@/components/SafeImage';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/settings');
            const data = await response.json();
            if (data.success) {
                setSettings(data.settings);
            } else {
                toast.error('Failed to load settings');
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            toast.error('Error connecting to the server');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        try {
            setSaving(true);
            const response = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Settings updated successfully!');
                setSettings(data.settings);
            } else {
                toast.error(data.message || 'Failed to update settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[#52dd28ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 font-medium">Loading store settings...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'contact', label: 'Contact', icon: Mail },
        { id: 'social', label: 'Social', icon: Share2 },
        { id: 'policies', label: 'Policies', icon: Shield },
        { id: 'legal', label: 'Legal', icon: FileText },
    ];

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto pb-20">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
                        <p className="text-gray-500 text-sm mt-1">Configure your brand identity, contact info, and business policies.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center justify-center gap-2 bg-[#52dd28ff] hover:bg-[#45b824] text-white px-6 py-2.5 rounded-box font-semibold shadow-sm transition-all duration-300 disabled:opacity-50"
                    >
                        {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex overflow-x-auto scrollbar-hide bg-white border border-gray-200 p-1 rounded-box mb-8 shadow-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-box text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-[#52dd28ff] text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-200 rounded-box shadow-sm overflow-hidden"
                >
                    <div className="p-6 sm:p-8">
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <section className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                        <Globe className="w-5 h-5 text-[#52dd28ff]" /> Brand Identity
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Site Name</label>
                                            <input
                                                type="text"
                                                value={settings.branding.siteName}
                                                onChange={(e) => updateField('branding', 'siteName', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                placeholder="Thulira"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Tagline</label>
                                            <input
                                                type="text"
                                                value={settings.branding.tagline}
                                                onChange={(e) => updateField('branding', 'tagline', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                placeholder="Sustainable Living"
                                            />
                                        </div>

                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="space-y-6">
                                <section className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                        <Mail className="w-5 h-5 text-[#52dd28ff]" /> Contact & Support
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Support Email</label>
                                            <input
                                                type="email"
                                                value={settings.contact.supportEmail}
                                                onChange={(e) => updateField('contact', 'supportEmail', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                placeholder="support@thulira.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Support Phone</label>
                                            <input
                                                type="text"
                                                value={settings.contact.supportPhone}
                                                onChange={(e) => updateField('contact', 'supportPhone', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                placeholder="+91 9087352282"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">WhatsApp Number</label>
                                            <input
                                                type="text"
                                                value={settings.contact.whatsappNumber}
                                                onChange={(e) => updateField('contact', 'whatsappNumber', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                placeholder="+91 9087352282"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Store Address</label>
                                            <textarea
                                                value={settings.contact.address}
                                                onChange={(e) => updateField('contact', 'address', e.target.value)}
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50 resize-none"
                                                placeholder="123 Green Street, Eco City..."
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div className="space-y-6">
                                <section className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                        <Share2 className="w-5 h-5 text-[#52dd28ff]" /> Social Media Links
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-pink-100 rounded-box flex items-center justify-center text-pink-600 flex-shrink-0">
                                                <Instagram className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Instagram Profile</label>
                                                <input
                                                    type="text"
                                                    value={settings.social.instagram}
                                                    onChange={(e) => updateField('social', 'instagram', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-box focus:outline-none focus:ring-1 focus:ring-[#52dd28ff]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-box flex items-center justify-center text-blue-600 flex-shrink-0">
                                                <Facebook className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Facebook Page</label>
                                                <input
                                                    type="text"
                                                    value={settings.social.facebook}
                                                    onChange={(e) => updateField('social', 'facebook', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-box focus:outline-none focus:ring-1 focus:ring-[#52dd28ff]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-black rounded-box flex items-center justify-center text-white flex-shrink-0">
                                                <Twitter className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">X (formerly Twitter)</label>
                                                <input
                                                    type="text"
                                                    value={settings.social.twitter}
                                                    onChange={(e) => updateField('social', 'twitter', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-box focus:outline-none focus:ring-1 focus:ring-[#52dd28ff]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'policies' && (
                            <div className="space-y-6">
                                <section className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                        <Shield className="w-5 h-5 text-[#52dd28ff]" /> Sales & Tax Policies
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-xs">GST Percentage (%)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={settings.policies.gstPercentage}
                                                    onChange={(e) => updateField('policies', 'gstPercentage', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-xs">Free Shipping Min Amount (₹)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                                <input
                                                    type="number"
                                                    value={settings.policies.freeShippingThreshold}
                                                    onChange={(e) => updateField('policies', 'freeShippingThreshold', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-xs">Base Shipping Cost (₹)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                                <input
                                                    type="number"
                                                    value={settings.policies.baseShippingCost}
                                                    onChange={(e) => updateField('policies', 'baseShippingCost', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-box flex items-start gap-3 mt-8">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-yellow-800">
                                            <strong>Note:</strong> Changes to tax and shipping policies will apply to all <strong>new</strong> orders immediately. Currently processing orders will not be affected.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        )}
                        {activeTab === 'legal' && (
                            <div className="space-y-8">
                                <section className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                        <FileText className="w-5 h-5 text-[#52dd28ff]" /> Legal Documents
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Terms & Conditions</label>
                                            <p className="text-xs text-gray-500 mb-3 text-italic">Detailed terms and conditions for your store.</p>
                                            <textarea
                                                value={settings.policies.termsAndConditions}
                                                onChange={(e) => updateField('policies', 'termsAndConditions', e.target.value)}
                                                rows={10}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                placeholder="Enter your Terms & Conditions content here..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Privacy Policy</label>
                                            <p className="text-xs text-gray-500 mb-3 text-italic">Detailed privacy policy regarding user data.</p>
                                            <textarea
                                                value={settings.policies.privacyPolicy}
                                                onChange={(e) => updateField('policies', 'privacyPolicy', e.target.value)}
                                                rows={10}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-box focus:outline-none focus:ring-2 focus:ring-[#52dd28ff]/20 bg-gray-50/50"
                                                placeholder="Enter your Privacy Policy content here..."
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Status Bar */}
                <div className="mt-8 bg-gray-900 border border-gray-800 p-6 rounded-box shadow-xl text-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${settings.status.maintenanceMode ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                <Settings className={`w-6 h-6 ${settings.status.maintenanceMode ? 'animate-pulse' : ''}`} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Maintenance Mode</h4>
                                <p className="text-gray-400 text-sm">Disable access to the storefront for regular maintenance.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.status.maintenanceMode}
                                onChange={(e) => updateField('status', 'maintenanceMode', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

