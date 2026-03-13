'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import { toast } from 'react-toastify';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'mobile'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [otpStep, setOtpStep] = useState(false); // For registration OTP
    const [forgotPasswordStep, setForgotPasswordStep] = useState(false); // For password reset
    const [otpData, setOtpData] = useState({ userId: '', email: '', mobile: '' }); // Store user data during OTP process
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { login } = useAuth();

    // Countdown timer effect
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const validateForm = () => {
        const newErrors = {};

        if (authMethod === 'email') {
            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
            }
        } else {
            if (!formData.mobile) {
                newErrors.mobile = 'Mobile number is required';
            } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(formData.mobile)) {
                newErrors.mobile = 'Please enter a valid Indian mobile number';
            }
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Min 6 characters';
        }

        if (!isLogin && !formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!isLogin && !agreedToTerms) {
            newErrors.terms = 'You must agree to the Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateOTP = () => {
        const newErrors = {};

        if (!otp || otp.length !== 6) {
            newErrors.otp = 'Please enter a valid 6-digit OTP';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateResetPassword = () => {
        const newErrors = {};

        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            setErrors({});

            if (authMethod === 'email') {
                const response = await fetch('/api/auth/send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setOtpData({ userId: data.userId, email: data.email, mobile: '' });
                    setOtpStep(true);
                    setCountdown(600); // 10 minutes
                    toast.success('OTP sent to your email!');
                } else {
                    toast.error(data.message || 'Failed to send OTP');
                    setErrors({ general: data.message });
                }
            } else {
                const response = await fetch('/api/auth/mobile/send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mobile: formData.mobile.startsWith('+91') ? formData.mobile : '+91' + formData.mobile
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setOtpData({ userId: '', email: '', mobile: formData.mobile });
                    setOtpStep(true);
                    setCountdown(600); // 10 minutes
                    toast.success('OTP sent to your mobile!');
                } else {
                    toast.error(data.message || 'Failed to send OTP');
                    setErrors({ general: data.message });
                }
            }
        } catch (error) {
            console.error('Send OTP error:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        if (!validateOTP()) return;

        try {
            setIsLoading(true);
            setErrors({});

            if (authMethod === 'email') {
                const response = await fetch('/api/auth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: otpData.userId,
                        otp: otp
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success('Account created successfully!');
                    window.location.reload();
                } else {
                    toast.error(data.message || 'Invalid OTP');
                    setErrors({ otp: data.message });
                }
            } else {
                const mobileNumber = otpData.mobile.startsWith('+91') ? otpData.mobile : '+91' + otpData.mobile;

                const response = await fetch('/api/auth/mobile/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mobile: mobileNumber,
                        otp: otp,
                        name: formData.name,
                        password: formData.password
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success(data.message || 'Login successful!');
                    window.location.reload();
                } else {
                    toast.error(data.message || 'Invalid OTP');
                    setErrors({ otp: data.message });
                }
            }
        } catch (error) {
            console.error('Verify OTP error:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (countdown > 0) return;

        try {
            setIsLoading(true);
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                setCountdown(600);
                toast.success('OTP resent successfully!');
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to resend OTP');
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            toast.error('Network error.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        if (e) e.preventDefault();

        try {
            setIsLoading(true);
            setErrors({});

            if (authMethod === 'email') {
                if (!formData.email) {
                    setErrors({ email: 'Email is required' });
                    return;
                }

                const response = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email }),
                });

                const data = await response.json();

                if (response.ok) {
                    setForgotPasswordStep(true);
                    setOtpData({ userId: data.userId, email: formData.email, mobile: '' });
                    setCountdown(600);
                    toast.success('Reset OTP sent to your email!');
                } else {
                    toast.error(data.message || 'Failed to send OTP');
                }
            } else {
                if (!formData.mobile) {
                    setErrors({ mobile: 'Mobile number is required' });
                    return;
                }

                const mobileNumber = formData.mobile.startsWith('+91') ? formData.mobile : '+91' + formData.mobile;

                const response = await fetch('/api/auth/mobile/reset-password/otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mobile: mobileNumber }),
                });

                const data = await response.json();

                if (response.ok) {
                    setForgotPasswordStep(true);
                    setOtpData({ userId: '', email: '', mobile: formData.mobile });
                    setCountdown(600);
                    toast.success('Reset OTP sent to your mobile!');
                } else {
                    toast.error(data.message || 'Failed to send OTP');
                }
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error('Network error.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!validateResetPassword()) return;

        try {
            setIsLoading(true);
            setErrors({});

            let response;
            if (authMethod === 'email') {
                response = await fetch('/api/auth/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: otpData.userId,
                        otp: otp,
                        newPassword: newPassword
                    }),
                });
            } else {
                const mobileNumber = otpData.mobile.startsWith('+91') ? otpData.mobile : '+91' + otpData.mobile;
                response = await fetch('/api/auth/mobile/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mobile: mobileNumber,
                        otp: otp,
                        newPassword: newPassword
                    }),
                });
            }

            const data = await response.json();

            if (response.ok) {
                toast.success('Password reset successfully!');
                setForgotPasswordStep(false);
                setOtpStep(false);
                setIsLogin(true);
                setFormData({ name: '', email: '', mobile: '', password: '' });
                setOtp('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error('Network error.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const loginAs = isAdmin ? 'admin' : 'user';

        if (isLogin) {
            await login(formData.email, formData.password, loginAs);
        } else {
            await handleSendOTP(e);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            const loginAs = isAdmin ? 'admin' : 'user';

            const response = await fetch('/api/auth/google/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idToken,
                    userInfo: {
                        uid: result.user.uid,
                        email: result.user.email,
                        displayName: result.user.displayName,
                        photoURL: result.user.photoURL
                    },
                    loginAs
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (typeof window !== 'undefined') {
                    window.location.href = data.user.loginAs === 'admin' ? '/admin' : '/';
                }
            } else {
                alert(data.message || 'Google authentication failed');
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
            alert('Google authentication failed.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setFormData(prev => ({ ...prev, mobile: value }));
        if (errors.mobile) {
            setErrors(prev => ({ ...prev, mobile: '' }));
        }
    };

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOtp(value);
        if (errors.otp) {
            setErrors(prev => ({ ...prev, otp: '' }));
        }
    };

    const handleNewPasswordChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <MobileNav />

            <div className="lg:ml-[280px] flex flex-col min-h-screen">
                <div className="h-14 lg:hidden"></div>

                <div className="flex-1 px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
                    <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-box shadow-sm border border-gray-200 p-5 sm:p-6"
                            >
                                <div className="text-center mb-5">
                                    <Link href="/" className="inline-block">
                                        <div className="text-3xl font-heading font-bold text-[#52dd28ff] mb-2">
                                            Thulira
                                        </div>
                                    </Link>
                                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                                        {isLogin ? 'Welcome Back' : 'Create Account'}
                                    </h1>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                        {isLogin ? 'Sign in to your account' : 'Join the sustainable journey'}
                                    </p>
                                </div>

                                {otpStep && (
                                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Mail className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-2">Verify Your {authMethod === 'email' ? 'Email' : 'Mobile'}</h2>
                                            <p className="text-gray-600">
                                                Enter the code sent to <span className="font-medium">
                                                    {authMethod === 'email' ? otpData.email : `+91${otpData.mobile}`}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">Verification Code</label>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={handleOtpChange}
                                                className={`w-full px-4 py-3 tracking-widest border rounded-box text-center ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="0 0 0 0 0 0"
                                                maxLength={6}
                                                autoFocus
                                            />
                                            {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <button type="button" onClick={handleResendOTP} disabled={isLoading || countdown > 0} className="text-[#52dd28ff] hover:underline disabled:opacity-50">
                                                {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend Code'}
                                            </button>
                                            <button type="button" onClick={() => setOtpStep(false)} className="text-gray-600 hover:text-gray-900">Change Details</button>
                                        </div>
                                        <button type="submit" disabled={isLoading || otp.length !== 6} className="w-full py-3 bg-[#52dd28ff] text-white rounded-box font-medium flex items-center justify-center gap-2 hover:bg-[#45b824] disabled:opacity-50">
                                            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Verify Account <ArrowRight className="w-5 h-5" /></>}
                                        </button>
                                    </form>
                                )}

                                {forgotPasswordStep && (
                                    <form onSubmit={handleResetPassword} className="space-y-4">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Lock className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-2">Reset Password</h2>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">OTP Code</label>
                                            <input type="text" value={otp} onChange={handleOtpChange} className="w-full px-4 py-3 border rounded-box text-center" placeholder="0 0 0 0 0 0" maxLength={6} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input name="newPassword" type={showPassword ? 'text' : 'password'} value={newPassword} onChange={handleNewPasswordChange} className="w-full pl-10 pr-12 py-3 border rounded-box" placeholder="New password" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">Confirm Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input name="confirmPassword" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleNewPasswordChange} className="w-full pl-10 pr-12 py-3 border rounded-box" placeholder="Confirm password" />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full py-3 bg-[#52dd28ff] text-white rounded-box font-medium">Reset Password</button>
                                    </form>
                                )}

                                {!otpStep && !forgotPasswordStep && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex bg-gray-100 rounded-box p-1 mb-4">
                                            <button type="button" onClick={() => setAuthMethod('email')} className={`flex-1 py-2 px-4 rounded-box text-sm font-medium transition-colors ${authMethod === 'email' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'}`}>Email</button>
                                            <button type="button" onClick={() => setAuthMethod('mobile')} className={`flex-1 py-2 px-4 rounded-box text-sm font-medium transition-colors ${authMethod === 'mobile' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'}`}>Mobile</button>
                                        </div>

                                        {!isLogin && (
                                            <div>
                                                <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input name="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 border rounded-box" placeholder="Full name" />
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">{authMethod === 'email' ? 'Email' : 'Mobile'}</label>
                                            <div className="relative">
                                                {authMethod === 'email' ? (
                                                    <>
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 border rounded-box" placeholder="email@example.com" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+91</span>
                                                        <input name="mobile" type="tel" value={formData.mobile} onChange={handleMobileChange} className="w-full pl-12 pr-3 py-2.5 border rounded-box" placeholder="9876543210" maxLength={10} />
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="w-full pl-10 pr-10 py-2.5 border rounded-box" placeholder="Min 6 characters" />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                                </button>
                                            </div>
                                        </div>

                                        {isLogin && (
                                            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-box">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="w-4 h-4 text-[#52dd28ff]" />
                                                    <span className="text-xs font-medium text-gray-700">Admin Login</span>
                                                </div>
                                                <button type="button" onClick={() => setIsAdmin(!isAdmin)} className={`relative inline-flex h-6 w-11 items-center rounded-full ${isAdmin ? 'bg-[#52dd28ff]' : 'bg-gray-300'}`}>
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAdmin ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                        )}

                                        {!isLogin && (
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="terms-agreement"
                                                        checked={agreedToTerms}
                                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                        className="mt-1 w-4 h-4 text-[#52dd28ff] border-gray-300 rounded focus:ring-[#52dd28ff]"
                                                    />
                                                    <label htmlFor="terms-agreement" className="text-xs text-gray-600 leading-tight">
                                                        I agree to the <Link href="/terms" className="text-[#52dd28ff] font-bold hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-[#52dd28ff] font-bold hover:underline">Privacy Policy</Link>
                                                    </label>
                                                </div>
                                                {errors.terms && <p className="text-[10px] text-red-500">{errors.terms}</p>}

                                                <div className="flex items-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="marketing-consent"
                                                        className="mt-1 w-4 h-4 text-[#52dd28ff] border-gray-300 rounded focus:ring-[#52dd28ff]"
                                                    />
                                                    <label htmlFor="marketing-consent" className="text-xs text-gray-600 leading-tight">
                                                        Sign up for email marketing & exclusive offers (Optional)
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        <button type="submit" disabled={isLoading} className="w-full py-2.5 bg-[#52dd28ff] text-white rounded-box font-medium flex items-center justify-center gap-2 hover:bg-[#45b824] transition-colors">
                                            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>{isLogin ? 'Log In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>}
                                        </button>

                                        {isLogin && (
                                            <div className="text-center mt-2">
                                                <button type="button" onClick={handleForgotPassword} className="text-xs text-[#52dd28ff] hover:underline">Forgot Password?</button>
                                            </div>
                                        )}

                                        <div className="relative my-4">
                                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                                            <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-gray-500">Or</span></div>
                                        </div>

                                        <button type="button" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-box text-sm hover:bg-gray-50">
                                            Sign In with Google
                                        </button>
                                    </form>
                                )}

                                <div className="mt-4 text-center">
                                    <p className="text-xs sm:text-sm text-gray-600 gap-7">
                                        {isLogin ? "Don't have an account?  " : "Already have an account?  "}
                                        <button type="button" onClick={() => { setIsLogin(!isLogin); setFormData({ name: '', email: '', password: '' }); setErrors({}); setIsAdmin(false); setOtpStep(false); setForgotPasswordStep(false); }} className="ml-1 text-[#52dd28ff] font-medium hover:underline">
                                            {isLogin ? 'Sign Up' : 'Log In'}
                                        </button>
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
