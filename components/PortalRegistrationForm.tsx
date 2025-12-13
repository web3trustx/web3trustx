'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function PortalRegistrationForm() {
  const { t } = useLanguage();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return t.portalRegister.errors.passwordMinLength || 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(pwd)) {
      return t.portalRegister.errors.passwordNeedsUppercase || 'Password needs uppercase letter';
    }
    if (!/[a-z]/.test(pwd)) {
      return t.portalRegister.errors.passwordNeedsLowercase || 'Password needs lowercase letter';
    }
    if (!/[0-9]/.test(pwd)) {
      return t.portalRegister.errors.passwordNeedsNumber || 'Password needs a number';
    }
    return null;
  };

  const validateForm = (): boolean => {
    let valid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!name.trim()) {
      setNameError(t.portalRegister.errors.nameRequired || 'Name is required');
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError(t.portalRegister.errors.nameMinLength || 'Name must be at least 2 characters');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError(t.portalRegister.errors.emailRequired || 'Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t.portalRegister.errors.emailInvalid || 'Invalid email format');
      valid = false;
    }

    if (!password) {
      setPasswordError(t.portalRegister.errors.passwordRequired || 'Password is required');
      valid = false;
    } else {
      const passwordValidationError = validatePassword(password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        valid = false;
      }
    }

    if (!confirmPassword) {
      setConfirmPasswordError(t.portalRegister.errors.confirmPasswordRequired || 'Confirm password is required');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t.portalRegister.errors.passwordMismatch || 'Passwords do not match');
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
      const response = await fetch('https://portal.web3trustx.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        // Resetear formulario después de 5 segundos
        setTimeout(() => {
          setIsSuccess(false);
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }, 5000);
      } else {
        const errorMsg = data.error || (t.portalRegister.errors.registrationFailed || 'Registration failed');
        
        const lowerError = errorMsg.toLowerCase();
        if (lowerError.includes('email')) {
          setEmailError(errorMsg);
        } else if (lowerError.includes('name')) {
          setNameError(errorMsg);
        } else if (lowerError.includes('password')) {
          setPasswordError(errorMsg);
        } else {
          setEmailError(errorMsg);
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setEmailError(t.portalRegister.errors.unexpectedError || 'An unexpected error occurred');
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
          {t.portalRegister.success || 'Registration Successful!'}
        </h3>
        <p className="text-gray-400">
          {t.portalRegister.successMessage?.replace('{email}', email) || `Your account has been created. Check ${email} for verification.`}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="card-cyber p-8">
      <h2 className="text-3xl font-bold text-white mb-2">
        {t.portalRegister.title || 'Register for TrustXData Portal'}
      </h2>
      <p className="text-gray-400 mb-6">
        {t.portalRegister.subtitle || 'Create your account to access the API and developer dashboard'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            {t.portalRegister.name || 'Full Name'}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError('');
            }}
            placeholder={t.portalRegister.namePlaceholder || 'John Doe'}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              nameError ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            {t.portalRegister.email || 'Email Address'}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            placeholder={t.portalRegister.emailPlaceholder || 'you@example.com'}
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            {t.portalRegister.password || 'Password'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
            }}
            placeholder={t.portalRegister.passwordPlaceholder || '••••••••'}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              passwordError ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {t.portalRegister.passwordHint || 'Min 8 characters, uppercase, lowercase, and number'}
          </p>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
            {t.portalRegister.confirmPassword || 'Confirm Password'}
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) setConfirmPasswordError('');
            }}
            placeholder={t.portalRegister.confirmPasswordPlaceholder || '••••••••'}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              confirmPasswordError ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (t.portalRegister.registering || 'Creating Account...') : (t.portalRegister.register || 'Create Account')}
        </button>

        <p className="text-center text-sm text-gray-400">
          {t.portalRegister.hasAccount || 'Already have an account?'}{' '}
          <a href="https://portal.web3trustx.com/login" className="text-primary hover:underline">
            {t.portalRegister.login || 'Login here'}
          </a>
        </p>
      </form>
    </div>
  );
}
