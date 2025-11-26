'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function APIKeyForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    usage: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulamos el envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Resetear formulario después de 5 segundos
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ firstName: '', lastName: '', email: '', usage: '' });
        setAcceptedTerms(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
        <h3 className="text-2xl font-bold text-white mb-2">{t.trustxdataApi.keyForm.success}</h3>
        <p className="text-gray-400">
          {t.trustxdataApi.keyForm.successMessage.replace('{email}', formData.email)}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="card-cyber p-8">
      <h2 className="text-3xl font-bold text-white mb-2">{t.trustxdataApi.keyForm.title}</h2>
      <p className="text-gray-400 mb-6">{t.trustxdataApi.keyForm.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
              {t.trustxdataApi.keyForm.firstName}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t.trustxdataApi.keyForm.firstNamePlaceholder}
              className={`w-full px-4 py-3 bg-dark-lighter border ${
                errors.firstName ? 'border-red-500' : 'border-white/10'
              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
              {t.trustxdataApi.keyForm.lastName}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t.trustxdataApi.keyForm.lastNamePlaceholder}
              className={`w-full px-4 py-3 bg-dark-lighter border ${
                errors.lastName ? 'border-red-500' : 'border-white/10'
              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            {t.trustxdataApi.keyForm.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.trustxdataApi.keyForm.emailPlaceholder}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              errors.email ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="usage" className="block text-sm font-medium text-gray-300 mb-2">
            {t.trustxdataApi.keyForm.usage}
          </label>
          <textarea
            id="usage"
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            placeholder={t.trustxdataApi.keyForm.usagePlaceholder}
            rows={3}
            className="w-full px-4 py-3 bg-dark-lighter border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: '' }));
                }
              }}
              className="mt-1 w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {t.trustxdataApi.keyForm.terms}{' '}
              <a href="/terms" className="text-primary hover:underline">
                {t.trustxdataApi.keyForm.termsLink}
              </a>{' '}
              {t.trustxdataApi.keyForm.privacy}{' '}
              <a href="/privacy" className="text-primary hover:underline">
                {t.trustxdataApi.keyForm.privacyLink}
              </a>
            </span>
          </label>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t.trustxdataApi.keyForm.submitting : t.trustxdataApi.keyForm.submit}
        </button>

        <p className="text-center text-sm text-gray-400">
          {t.trustxdataApi.keyForm.recoverKey}{' '}
          <a href="/trustxdata/api#recover" className="text-primary hover:underline">
            {t.trustxdataApi.keyForm.recoverKeyLink}
          </a>
        </p>
      </form>
    </div>
  );
}
