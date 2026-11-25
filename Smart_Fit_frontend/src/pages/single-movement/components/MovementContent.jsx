import React from 'react';
import { Typography } from '../../../components/Typography';

const MovementContent = ({ movement }) => {
  // Destructure the new 'instructions' property
  const { Title, BodyPart, Equipment, Level, Type, youtubeId, instructions } = movement;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8">
        <Typography variant="h2" className="text-gray-900 mb-6 border-b border-gray-200 pb-4">
          {Title}
        </Typography>

        {/* Video Embed Section (already fixed) */}
        {youtubeId ? (
          <div className="mb-8">
            <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-black" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`YouTube video player for ${Title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-8 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-500">Video tutorial not available for this exercise.</p>
          </div>
        )}

        {/* Details Section (already fixed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          {/* ... details like muscle, equipment, etc. ... */}
          <div className="flex items-center p-3 bg-gray-50 rounded-md"><strong className="w-32 shrink-0 text-gray-500 font-medium">Primary Muscle:</strong><span className="font-semibold text-gray-800">{BodyPart}</span></div>
          <div className="flex items-center p-3 bg-gray-50 rounded-md"><strong className="w-32 shrink-0 text-gray-500 font-medium">Equipment:</strong><span className="font-semibold text-gray-800">{Equipment}</span></div>
          <div className="flex items-center p-3 bg-gray-50 rounded-md"><strong className="w-32 shrink-0 text-gray-500 font-medium">Difficulty:</strong><span className={`font-semibold ${Level === 'Beginner' ? 'text-green-600' : 'text-yellow-600'}`}>{Level}</span></div>
          <div className="flex items-center p-3 bg-gray-50 rounded-md"><strong className="w-32 shrink-0 text-gray-500 font-medium">Style:</strong><span className="font-semibold text-gray-800">{Type}</span></div>
        </div>

        {/* --- THIS IS THE UPDATED INSTRUCTIONS SECTION --- */}
        <div className="mt-10">
          <Typography variant="h4" className="mb-3 text-gray-800">How to Perform</Typography>
          {instructions && instructions.length > 0 ? (
            <ol className="list-decimal list-inside space-y-3 text-gray-600 leading-relaxed">
              {instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">Instructions are not available for this exercise.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default MovementContent;