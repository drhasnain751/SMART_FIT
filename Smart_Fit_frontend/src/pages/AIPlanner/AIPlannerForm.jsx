// src/pages/AIPlanner/AIPlannerForm.jsx
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { 
  Sparkles, 
  Activity, 
  Target, 
  Zap, 
  Brain,
  TrendingUp,
  User,
  Dumbbell
} from 'lucide-react';

const equipmentOptions = [
  { name: "Body Weight", icon: "🏃" },
  { name: "Dumbbell", icon: "🏋️" },
  { name: "Barbell", icon: "💪" },
  { name: "Kettlebells", icon: "⚫" },
  { name: "Bands", icon: "🎯" },
  { name: "Cable", icon: "🔗" },
  { name: "Machine", icon: "⚙️" },
  { name: "Exercise Ball", icon: "⚽" }
];

const AIPlannerForm = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState({
    gender: 'male',
    weight_kg: 70,
    height_cm: 175,
    age: 25,
    activity_level: 1.55,
    user_level: 'Beginner',
    available_equipment: ['Body Weight'],
    goal: 'muscle_gain',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEquipmentChange = (equipmentName) => {
    setFormData((prev) => {
      const isSelected = prev.available_equipment.includes(equipmentName);
      const newEquipment = isSelected
        ? prev.available_equipment.filter((item) => item !== equipmentName)
        : [...prev.available_equipment, equipmentName];
      return { ...prev, available_equipment: newEquipment };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericData = {
      ...formData,
      weight_kg: parseFloat(formData.weight_kg),
      height_cm: parseFloat(formData.height_cm),
      age: parseInt(formData.age, 10),
      activity_level: parseFloat(formData.activity_level),
    };
    onGenerate(numericData);
  };

  return (
    <div className="relative">
      {/* AI Neural Network Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 mb-4 shadow-lg shadow-purple-500/50 animate-pulse-slow">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-cyan-600 to-pink-600 bg-clip-text text-transparent mb-2">
            AI-Powered Fitness Planner
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Let AI create your personalized plan
          </p>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Personal Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white/50"
                required
              />
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                name="weight_kg"
                type="number"
                value={formData.weight_kg}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white/50"
                required
              />
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                name="height_cm"
                type="number"
                value={formData.height_cm}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white/50"
                required
              />
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white/50 cursor-pointer"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Goals & Activity Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-cyan-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Goals & Activity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                Primary Goal
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 outline-none bg-white/50 cursor-pointer"
              >
                <option value="muscle_gain">💪 Muscle Gain</option>
                <option value="fat_loss">🔥 Fat Loss</option>
                <option value="strength_gain">⚡ Strength Gain</option>
                <option value="maintenance">🎯 Maintenance</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Fitness Level
              </label>
              <select
                name="user_level"
                value={formData.user_level}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 outline-none bg-white/50 cursor-pointer"
              >
                <option value="Beginner">🌱 Beginner</option>
                <option value="Intermediate">🚀 Intermediate</option>
              </select>
            </div>

            <div className="relative group md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                Activity Level
              </label>
              <select
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 outline-none bg-white/50 cursor-pointer"
              >
                <option value={1.2}>😴 Sedentary (little to no exercise)</option>
                <option value={1.375}>🚶 Lightly Active (1-3 days/week)</option>
                <option value={1.55}>🏃 Moderately Active (3-5 days/week)</option>
                <option value={1.725}>🔥 Very Active (6-7 days/week)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Equipment Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Available Equipment</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {equipmentOptions.map((equip) => {
              const isSelected = formData.available_equipment.includes(equip.name);
              return (
                <button
                  key={equip.name}
                  type="button"
                  onClick={() => handleEquipmentChange(equip.name)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                    ${isSelected 
                      ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg shadow-pink-200' 
                      : 'border-gray-200 bg-white/50 hover:border-pink-300'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="text-3xl mb-2">{equip.icon}</div>
                  <div className={`text-xs font-medium ${isSelected ? 'text-pink-700' : 'text-gray-600'}`}>
                    {equip.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button content */}
            <span className="relative flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>AI is crafting your plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span>Generate My AI Plan</span>
                  <Brain className="w-6 h-6 group-hover:animate-bounce" />
                </>
              )}
            </span>
          </button>
        </div>
      </form>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AIPlannerForm;