// src/pages/AIPlanner/index.jsx
import React, { useState } from 'react';
import AIPlannerForm from './AIPlannerForm';
import PlanDisplay from './PlanDisplay';
import { Typography } from '../../components/Typography';
import api from '../../lib/services/api'; // Import our authenticated axios instance

const AIPlannerPage = () => {
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeneratePlan = async (formData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    try {
      // Use 'api.post' which automatically includes the auth token
      const workoutResponse = await api.post('/generate-workout', formData);
      const dietResponse = await api.post('/generate-diet', formData);

      // Axios wraps the response JSON in a 'data' property
      setGeneratedPlan({ workout: workoutResponse.data, diet: dietResponse.data });

    } catch (err) {
      console.error("Failed to generate plan:", err);
      // Handle API errors, including 401 Unauthorized if the token is bad/expired
      const detail = err.response?.data?.detail || "An error occurred. You may need to log in again.";
      setError(detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <Typography variant="h2" className="text-gray-900">Your Personal AI Fitness Planner</Typography>
          <Typography variant="body" className="mt-4 text-lg text-gray-600">
            Fill in your details below to generate a personalized workout and diet plan just for you.
          </Typography>
        </div>
        <div className="mt-10 bg-white p-8 shadow-lg rounded-lg">
          <AIPlannerForm onGenerate={handleGeneratePlan} isLoading={isLoading} />
        </div>
        {error && (
          <div className="mt-8 text-center p-4 bg-red-100 text-red-700 rounded-lg">
            <Typography variant="h6">An Error Occurred</Typography>
            <p>{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="mt-8 text-center">
            <Typography variant="h5" className="text-indigo-600 animate-pulse">Generating your personalized plan...</Typography>
            <p className="text-gray-500">Our AI is hard at work. This may take a moment.</p>
          </div>
        )}
        {generatedPlan && !isLoading && (
          <div className="mt-12">
            <PlanDisplay plan={generatedPlan} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlannerPage;