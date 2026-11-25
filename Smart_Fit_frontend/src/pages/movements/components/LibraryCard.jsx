import { Link } from "react-router-dom";
import BarbellIcon from "../../../assets/icons/barbell-icon.svg?react";
import DifficultyLevelLgIcon from "../../../assets/icons/difficulty-level-icon.svg?react";
import MuscleIcon from "../../../assets/icons/muscle-icon.svg?react";
import { pagesRoutes } from "../../../lib/routes/page-routes";

const LibraryCard = ({ movement }) => {
  if (!movement) {
    return null;
  }

  const {
    id,
    Title: movementName,
    Equipment: equipmentName,
    BodyPart: primaryMuscle,
    Type: trainingStyleName,
    Level: difficulty,
    imageUrl, // Use the local imageUrl property
  } = movement;

  const difficultyColor =
    difficulty.toLowerCase() === "beginner"
      ? "text-green"
      : "text-golden-rod";

  const movementUrl = pagesRoutes.singleMovement.replace(":id", id);
  
  const primaryMusclesArr = [primaryMuscle];

  const renderListWithLimit = (items) => { /* ... (this function is fine) ... */ };

  return (
    <Link to={movementUrl}>
      <div className="flex-1 bg-whisper-gray h-full max-h-[367px] sm:max-h-[380px] rounded-xl p-3.5 cursor-pointer overflow-hidden flex flex-col gap-3.5 justify-between">
        <div>
          {/* ... (your card's top section is fine) ... */}
          <div className="mb-3 flex items-center gap-1">
            <div className="bg-soft-gray py-1 px-1.5 rounded-md w-max">
              <p className="text-xs font-medium leading-[16px] tracking-[-0.06px]">
                {trainingStyleName}
              </p>
            </div>
            <div className={`py-1.5 px-2 bg-soft-gray rounded-md flex flex-col gap-[1.5px] w-7 ${difficultyColor}`}>
              <DifficultyLevelLgIcon width={12} height={12} />
            </div>
          </div>
          <p className="font-bold text-base tracking-[-0.08px] leading-[22px] line-clamp-2">
            {movementName}
          </p>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <MuscleIcon />
              <div>{renderListWithLimit(primaryMusclesArr)}</div>
            </div>
            <div className="flex gap-1 items-center">
              <BarbellIcon />
              <span className="font-semibold text-sm tracking-[-0.07px] leading-[18px]">
                {equipmentName}
              </span>
            </div>
          </div>
        </div>
        <div className="max-h-[197px] sm:max-h-[140px] overflow-hidden rounded-md bg-gray-200">
          <img
            src={imageUrl} // Use the local image URL
            alt={`Image for ${movementName}`}
            className="rounded-md w-full h-full object-cover aspect-video"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
};

export default LibraryCard;