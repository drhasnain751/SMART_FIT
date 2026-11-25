// src/pages/movements/index.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { allExercises } from '../../lib/data/exerciseData'; 
import LibraryCard from './components/LibraryCard';
import { Typography } from '../../components/Typography';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Movements = () => {
  const query = useQuery();
  const location = useLocation();
  const [filteredMovements, setFilteredMovements] = useState(allExercises);
  const [specialMessage, setSpecialMessage] = useState(null);

  const pageTitle = useMemo(() => {
    // This part is fine and needs no changes
    const muscle = query.get('muscle');
    const equipment = query.get('equipment');
    const difficulty = query.get('difficulty-level');
    const trainingStyle = query.get('training-style');
    const searchQuery = query.get('search');

    if (muscle) return `Muscle: ${muscle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    if (equipment) return `Equipment: ${equipment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    if (difficulty) return `Difficulty: ${difficulty.replace(/\b\w/g, l => l.toUpperCase())}`;
    if (trainingStyle) return `Style: ${trainingStyle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    return 'All Movements';
  }, [query]);

  useEffect(() => {
    setSpecialMessage(null);
    const muscle = query.get('muscle')?.replace(/-/g, ' ');
    const equipment = query.get('equipment')?.replace(/-/g, ' ');
    const difficulty = query.get('difficulty-level');
    const trainingStyle = query.get('training-style');
    const searchQuery = query.get('search')?.toLowerCase();
    
    let movements = allExercises;

    // --- THIS IS THE UPDATED MUSCLE FILTER LOGIC ---
    if (muscle) {
      // Special case for the "Legs" category
      if (muscle === 'legs') {
        const legMuscles = ['quadriceps', 'hamstrings', 'glutes'];
        movements = movements.filter(ex => legMuscles.includes(ex.BodyPart.toLowerCase()));
      } else {
        // Original logic for all other specific muscles (e.g., 'abs' will find 'Abdominals')
        movements = movements.filter(ex => ex.BodyPart.toLowerCase().includes(muscle));
      }
    }

    // The rest of the filters remain the same
    if (equipment) {
      movements = movements.filter(ex => ex.Equipment.toLowerCase().includes(equipment));
    }
    if (difficulty) {
      movements = movements.filter(ex => ex.Level.toLowerCase() === difficulty);
    }
    if (searchQuery) {
      movements = movements.filter(ex => ex.Title.toLowerCase().includes(searchQuery));
    }

    if (trainingStyle) {
        // ... (your existing smart training style logic is here and correct)
        switch (trainingStyle) {
            case 'strength-training':
            case 'weightlifting':
            // ... etc.
            movements = movements.filter(ex => ex.Type.toLowerCase() === 'strength');
            break;
        }
    }
    
    setFilteredMovements(movements);

  }, [location.search]);

  // The JSX part of the component does not need any changes
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Typography variant="h2" className="text-gray-900">
            {pageTitle}
          </Typography>
          {/* ... */}
        </div>

        {filteredMovements.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMovements.map((movement) => (
              <LibraryCard key={movement.id} movement={movement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white rounded-lg shadow-md">
            <Typography variant="h5" className="text-gray-500">
              No Exercises Found
            </Typography>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movements;