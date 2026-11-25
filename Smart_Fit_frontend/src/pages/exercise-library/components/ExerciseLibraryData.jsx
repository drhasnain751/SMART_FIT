import React from "react";
import MusclesSection from "./MusclesSection";
import TrainingStyleSection from "./TrainingStyleSection";
import DifficultySection from "./DifficultySection";
import EquipmentsSection from "./EquipmentsSection";
import {
  difficultyLevels,
  movementEquipments,
  movementTrainingStyles,
  musclesData,
} from "./data";

export function ExerciseLibraryData() {
  return (
    <div className="max-md:my-8 md:mt-[70px] md:mb-[135px] max-w-[1100px] m-auto flex flex-col gap-[42px]">
      <MusclesSection muscles={musclesData} />
      <TrainingStyleSection trainingStyles={movementTrainingStyles} />
      <DifficultySection difficultyLevels={difficultyLevels} />
      <EquipmentsSection equipments={movementEquipments} />
    </div>
  );
}
