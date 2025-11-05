/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { CustomerPreferences } from '@/types';
import { Coffee, Heart, Leaf, Clock, MessageSquare, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface PreferencesFormProps {
  initialPreferences?: CustomerPreferences;
  onSave: (preferences: CustomerPreferences) => void;
  onClose: () => void;
}

export default function PreferencesForm({ initialPreferences, onSave, onClose }: PreferencesFormProps) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<CustomerPreferences>(initialPreferences || {});

  const steps = [
    { title: 'Beverages', icon: Coffee },
    { title: 'Food & Diet', icon: Heart },
    { title: 'Visit Habits', icon: Clock },
    { title: 'Interests', icon: Leaf },
    { title: 'Notifications', icon: MessageSquare },
  ];

  const calculateCompleteness = (prefs: CustomerPreferences): number => {
    const fields = [
      prefs.favoriteDrinkTypes?.length,
      prefs.caffeinePreference,
      prefs.milkPreferences?.length,
      prefs.sweetnessLevel,
      prefs.dietaryRestrictions?.length,
      prefs.favoriteFlavors?.length,
      prefs.preferredSize,
      prefs.preferredVisitTimes?.length,
      prefs.visitFrequency,
      prefs.visitPurpose?.length,
      prefs.favoriteFoodCategories?.length,
      prefs.tastePreference,
      prefs.interests?.length,
      prefs.bringOwnCup !== undefined,
      prefs.communicationPreferences?.email !== undefined,
    ];
    const filledFields = fields.filter(Boolean).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSave = () => {
    const updatedPreferences = {
      ...preferences,
      profileCompleteness: calculateCompleteness(preferences),
      lastUpdated: new Date().toISOString(),
    };
    onSave(updatedPreferences);
  };

  const toggleArrayItem = <T extends string>(field: keyof CustomerPreferences, value: T) => {
    const currentArray = (preferences[field] as T[] | undefined) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    setPreferences({ ...preferences, [field]: newArray } as CustomerPreferences);
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Beverages
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                What types of drinks do you enjoy? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'hot-coffee', label: '☕ Hot Coffee' },
                  { value: 'iced-coffee', label: '🧊 Iced Coffee' },
                  { value: 'hot-tea', label: '🍵 Hot Tea' },
                  { value: 'iced-tea', label: '🥤 Iced Tea' },
                  { value: 'specialty', label: '✨ Specialty Drinks' },
                  { value: 'frappuccino', label: '🥤 Frappuccino' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('favoriteDrinkTypes', option.value as any)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      preferences.favoriteDrinkTypes?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Caffeine Preference</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'regular', label: 'Regular' },
                  { value: 'decaf', label: 'Decaf' },
                  { value: 'half-caf', label: 'Half-Caf' },
                  { value: 'no-preference', label: 'No Preference' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, caffeinePreference: option.value as any })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      preferences.caffeinePreference === option.value
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Milk Preferences (Select all you like)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'whole', label: '🥛 Whole Milk' },
                  { value: 'skim', label: 'Skim Milk' },
                  { value: 'oat', label: '🌾 Oat Milk' },
                  { value: 'almond', label: '🌰 Almond Milk' },
                  { value: 'soy', label: 'Soy Milk' },
                  { value: 'coconut', label: '🥥 Coconut Milk' },
                  { value: 'no-milk', label: 'No Milk' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('milkPreferences', option.value as any)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      preferences.milkPreferences?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Sweetness Level</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'unsweetened', label: '🚫 Unsweetened' },
                  { value: 'lightly-sweet', label: '✨ Lightly Sweet' },
                  { value: 'regular', label: '⭐ Regular' },
                  { value: 'extra-sweet', label: '🍯 Extra Sweet' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, sweetnessLevel: option.value as any })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      preferences.sweetnessLevel === option.value
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1: // Food & Diet
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Dietary Restrictions</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'vegan', label: '🌱 Vegan' },
                  { value: 'vegetarian', label: '🥗 Vegetarian' },
                  { value: 'gluten-free', label: '🌾 Gluten-Free' },
                  { value: 'dairy-free', label: '🥛 Dairy-Free' },
                  { value: 'nut-allergy', label: '🥜 Nut Allergy' },
                  { value: 'sugar-free', label: '🍯 Sugar-Free' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('dietaryRestrictions', option.value as any)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      preferences.dietaryRestrictions?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Favorite Flavors</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'vanilla', label: 'Vanilla' },
                  { value: 'caramel', label: 'Caramel' },
                  { value: 'hazelnut', label: 'Hazelnut' },
                  { value: 'mocha', label: 'Mocha' },
                  { value: 'pumpkin-spice', label: 'Pumpkin Spice' },
                  { value: 'cinnamon', label: 'Cinnamon' },
                  { value: 'mint', label: 'Mint' },
                  { value: 'chocolate', label: 'Chocolate' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('favoriteFlavors', option.value as any)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      preferences.favoriteFlavors?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Favorite Food Categories</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'pastries', label: '🥐 Pastries' },
                  { value: 'sandwiches', label: '🥪 Sandwiches' },
                  { value: 'salads', label: '🥗 Salads' },
                  { value: 'snacks', label: '🍪 Snacks' },
                  { value: 'breakfast', label: '🍳 Breakfast' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('favoriteFoodCategories', option.value as any)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      preferences.favoriteFoodCategories?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Taste Preference</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'sweet', label: '🍰 Sweet' },
                  { value: 'savory', label: '🧂 Savory' },
                  { value: 'both', label: '🤝 Both' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, tastePreference: option.value as any })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      preferences.tastePreference === option.value
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Preferred Drink Size</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                  { value: 'extra-large', label: 'XL' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, preferredSize: option.value as any })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      preferences.preferredSize === option.value
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Visit Habits
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                When do you typically visit? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'early-morning', label: '🌅 Early Morning (6-8 AM)' },
                  { value: 'morning', label: '☀️ Morning (8-11 AM)' },
                  { value: 'midday', label: '🌞 Midday (11 AM-2 PM)' },
                  { value: 'afternoon', label: '🌤️ Afternoon (2-5 PM)' },
                  { value: 'evening', label: '🌆 Evening (5-8 PM)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('preferredVisitTimes', option.value as any)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      preferences.preferredVisitTimes?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">How often do you visit?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'daily', label: '📅 Daily' },
                  { value: 'few-times-week', label: '📆 Few times a week' },
                  { value: 'weekly', label: '🗓️ Weekly' },
                  { value: 'occasionally', label: '✨ Occasionally' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, visitFrequency: option.value as any })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      preferences.visitFrequency === option.value
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Why do you visit? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'work-study', label: '💼 Work/Study' },
                  { value: 'social', label: '👥 Social' },
                  { value: 'quick-grab', label: '⚡ Quick Grab & Go' },
                  { value: 'relaxation', label: '🧘 Relaxation' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('visitPurpose', option.value as any)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      preferences.visitPurpose?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Interests
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                What interests you? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'new-products', label: '✨ New Products' },
                  { value: 'seasonal-specials', label: '🍂 Seasonal Specials' },
                  { value: 'limited-offers', label: '⏰ Limited-Time Offers' },
                  { value: 'events', label: '🎉 Events & Tastings' },
                  { value: 'sustainability', label: '🌍 Sustainability' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayItem('interests', option.value as any)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      preferences.interests?.includes(option.value as any)
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Environmental Preferences</label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, bringOwnCup: !preferences.bringOwnCup })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    preferences.bringOwnCup
                      ? 'border-starbucks-green bg-starbucks-cream'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>♻️</span>
                    <span className="font-medium">I bring my own cup</span>
                  </span>
                  {preferences.bringOwnCup && <CheckCircle2 className="w-5 h-5 text-starbucks-green" />}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      preferSustainablePackaging: !preferences.preferSustainablePackaging,
                    })
                  }
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    preferences.preferSustainablePackaging
                      ? 'border-starbucks-green bg-starbucks-cream'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🌿</span>
                    <span className="font-medium">I prefer sustainable packaging</span>
                  </span>
                  {preferences.preferSustainablePackaging && <CheckCircle2 className="w-5 h-5 text-starbucks-green" />}
                </button>
              </div>
            </div>
          </div>
        );

      case 4: // Notifications
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">How would you like to hear from us?</label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      communicationPreferences: {
                        ...preferences.communicationPreferences,
                        email: !preferences.communicationPreferences?.email,
                      },
                    })
                  }
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    preferences.communicationPreferences?.email
                      ? 'border-starbucks-green bg-starbucks-cream'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>📧</span>
                    <span className="font-medium">Email</span>
                  </span>
                  {preferences.communicationPreferences?.email && (
                    <CheckCircle2 className="w-5 h-5 text-starbucks-green" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      communicationPreferences: {
                        ...preferences.communicationPreferences,
                        sms: !preferences.communicationPreferences?.sms,
                      },
                    })
                  }
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    preferences.communicationPreferences?.sms
                      ? 'border-starbucks-green bg-starbucks-cream'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>💬</span>
                    <span className="font-medium">SMS/Text</span>
                  </span>
                  {preferences.communicationPreferences?.sms && <CheckCircle2 className="w-5 h-5 text-starbucks-green" />}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      communicationPreferences: {
                        ...preferences.communicationPreferences,
                        push: !preferences.communicationPreferences?.push,
                      },
                    })
                  }
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    preferences.communicationPreferences?.push
                      ? 'border-starbucks-green bg-starbucks-cream'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🔔</span>
                    <span className="font-medium">Push Notifications</span>
                  </span>
                  {preferences.communicationPreferences?.push && (
                    <CheckCircle2 className="w-5 h-5 text-starbucks-green" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">How often?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'special-only', label: 'Special Offers Only' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setPreferences({
                        ...preferences,
                        communicationPreferences: {
                          ...preferences.communicationPreferences,
                          frequency: option.value as any,
                        },
                      })
                    }
                    className={`p-3 rounded-xl border-2 transition-all ${
                      preferences.communicationPreferences?.frequency === option.value
                        ? 'border-starbucks-green bg-starbucks-cream text-starbucks-green font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Completeness Preview */}
            <div className="mt-8 p-6 bg-gradient-to-br from-starbucks-green to-emerald-600 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold text-lg">Profile Completeness</span>
              </div>
              <div className="text-3xl font-bold mb-2">{calculateCompleteness(preferences)}%</div>
              <p className="text-sm opacity-90">
                The more we know about your preferences, the better we can personalize your experience and offer you
                relevant deals!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Personalize Your Experience</h2>
          <p className="text-sm text-gray-600">
            Tell us about your preferences so we can recommend the perfect drinks and offers for you
          </p>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mt-6">
            {steps.map((s, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    idx === step
                      ? 'bg-starbucks-green text-white'
                      : idx < step
                      ? 'bg-starbucks-cream text-starbucks-green'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 rounded transition-all ${
                      idx < step ? 'bg-starbucks-green' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-sm font-medium text-gray-700">{steps[step].title}</div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderStep()}</div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => (step > 0 ? setStep(step - 1) : onClose())}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            {step > 0 ? 'Back' : 'Cancel'}
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-starbucks-green text-white rounded-xl font-bold hover:bg-starbucks-light-green transition-all flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-starbucks-green to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Save Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
