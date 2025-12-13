'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function PortalLoginForm() {
  const { t } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = (): boolean => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError(t.portalLogin?.errors?.emailRequired || 'Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t.portalLogin?.errors?.emailInvalid || 'Invalid email format');
      valid = false;
    }

    if (!password) {
      setPasswordError(t.portalLogin?.errors?.passwordRequired || 'Password is required');
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Llamada a la API del portal
      const response = await fetch('https://api.web3trustx.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.data?.token) {
        setIsSuccess(true);
        // Redirigir al portal dashboard con el token
        window.location.href = `https://portal.web3trustx.com/dashboard?token=${data.data.token}`;
      } else {
        const errorMsg = data.error || (t.portalLogin?.errors?.loginFailed || 'Login failed');
        
        const lowerError = errorMsg.toLowerCase();
        if (lowerError.includes('email') || lowerError.includes('not found')) {
          setEmailError(errorMsg);
        } else if (lowerError.includes('password') || lowerError.includes('incorrect')) {
          setPasswordError(errorMsg);
        } else {
          setEmailError(errorMsg);
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setEmailError(t.portalLogin?.errors?.unexpectedError || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-cyber p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {t.portalLogin?.success || 'Login Successful!'}
        </h3>
        <p className="text-gray-400">
          {t.portalLogin?.successMessage || 'Redirecting to dashboard...'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="card-cyber p-8">
      <h2 className="text-3xl font-bold text-white mb-2">
        {t.portalLogin?.title || 'Login to TrustXData Portal'}
      </h2>
      <p className="text-gray-400 mb-6">
        {t.portalLogin?.subtitle || 'Access your dashboard and API keys'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-2">
            {t.portalLogin?.email || 'Email Address'}
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            placeholder={t.portalLogin?.emailPlaceholder || 'you@example.com'}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              emailError ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-2">
            {t.portalLogin?.password || 'Password'}
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
            }}
            placeholder={t.portalLogin?.passwordPlaceholder || '••••••••'}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              passwordError ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (t.portalLogin?.loggingIn || 'Logging In...') : (t.portalLogin?.login || 'Login')}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          {t.portalLogin?.noAccount || "Don't have an account?"}{' '}
          <a href="#api-key-form" className="text-primary hover:underline">
            {t.portalLogin?.register || 'Register here'}
          </a>
        </p>
      </form>
    </div>
  );
}
