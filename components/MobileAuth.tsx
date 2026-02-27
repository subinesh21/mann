'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface MobileAuthProps {
  onSwitchToEmail?: () => void;
}

export default function MobileAuth({ onSwitchToEmail }: MobileAuthProps) {
  const [step, setStep] = useState<'enter-mobile' | 'enter-otp' | 'reset-password'>('enter-mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex = /^(\+91|91)?[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const normalizeMobile = (mobile: string): string => {
    let normalized = mobile.trim();
    if (normalized.startsWith('91')) {
      normalized = '+' + normalized;
    } else if (!normalized.startsWith('+91')) {
      normalized = '+91' + normalized;
    }
    return normalized;
  };

  const handleSendOTP = async () => {
    if (!validateMobile(mobile)) {
      toast.error('Please enter a valid Indian mobile number');
      return;
    }

    setLoading(true);
    try {
      const normalizedMobile = normalizeMobile(mobile);
      const response = await fetch('/api/auth/mobile/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizedMobile })
      });

      const data = await response.json();

      if (response.ok) {
        setIsNewUser(data.isNewUser);
        setStep('enter-otp');
        toast.success('OTP sent successfully');
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const normalizedMobile = normalizeMobile(mobile);
      const response = await fetch('/api/auth/mobile/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizedMobile, otp })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isNewUser ? 'Account created successfully!' : 'Login successful!');
        router.push('/'); // Redirect to home page
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const normalizedMobile = normalizeMobile(mobile);
      const response = await fetch('/api/auth/mobile/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mobile: normalizedMobile, 
          otp, 
          newPassword 
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password reset successfully!');
        setStep('enter-mobile');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      const normalizedMobile = normalizeMobile(mobile);
      const response = await fetch('/api/auth/mobile/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizedMobile })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('OTP resent successfully');
      } else {
        toast.error(data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const normalizedMobile = normalizeMobile(mobile);
      const response = await fetch('/api/auth/mobile/reset-password/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizedMobile })
      });

      const data = await response.json();

      if (response.ok) {
        setStep('reset-password');
        toast.success('OTP sent for password reset');
      } else {
        toast.error(data.message || 'Failed to send reset OTP');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Failed to send reset OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mobile Input Step */}
      {step === 'enter-mobile' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">+91</span>
              </div>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={10}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              We'll send a 6-digit OTP to verify your mobile number
            </p>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={loading || !mobile}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>

          <div className="text-center">
            <button
              onClick={onSwitchToEmail}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Or sign in with email
            </button>
          </div>
        </div>
      )}

      {/* OTP Verification Step */}
      {step === 'enter-otp' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isNewUser ? 'Create Account' : 'Sign In'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the 6-digit OTP sent to {normalizeMobile(mobile)}
            </p>
            
            <div className="flex space-x-2 justify-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const newOtp = otp.split('');
                    newOtp[index] = e.target.value;
                    setOtp(newOtp.join('').slice(0, 6));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[index] && index > 0) {
                      const newOtp = otp.split('');
                      newOtp[index - 1] = '';
                      setOtp(newOtp.join(''));
                    }
                  }}
                  className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <button
              onClick={handleResendOTP}
              disabled={resending}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {resending ? 'Sending...' : 'Resend'}
            </button>
          </div>

          {!isNewUser && (
            <div className="text-center">
              <button
                onClick={handleForgotPassword}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => {
                setStep('enter-mobile');
                setOtp('');
              }}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Change mobile number
            </button>
          </div>
        </div>
      )}

      {/* Password Reset Step */}
      {step === 'reset-password' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reset Password</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the OTP and your new password
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              maxLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleResetPassword}
            disabled={loading || !otp || !newPassword || !confirmPassword}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          <div className="text-center">
            <button
              onClick={() => {
                setStep('enter-otp');
                setNewPassword('');
                setConfirmPassword('');
              }}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Back to OTP verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
}