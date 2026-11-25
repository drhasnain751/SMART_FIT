import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allExercises } from '../../lib/data/exerciseData'; 
import MovementContent from './components/MovementContent';
import { Typography } from '../../components/Typography';

const getSingleMovement = (movementId) => {
  const idAsNumber = parseInt(movementId, 10);
  return allExercises.find((movement) => movement.id === idAsNumber);
};

const SingleMovement = () => {
  const { id } = useParams(); // This will get the value of ':id' from the URL

  const [movement, setMovement] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMovement = getSingleMovement(id);
      if (foundMovement) {
        setMovement(foundMovement);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="text-center py-20">
        <Typography variant="h3" className="text-gray-700">Movement Not Found</Typography>
        <p className="text-gray-500 mt-2">The exercise ID in the URL is missing or invalid.</p>
      </div>
    );
  }

  if (!movement) {
    return <div className="text-center py-20">Loading movement details...</div>;
  }

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MovementContent movement={movement} />
      </div>
    </div>
  );
};

export default SingleMovement;