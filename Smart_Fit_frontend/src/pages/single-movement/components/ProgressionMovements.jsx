import LibraryCard from "../../movements/components/LibraryCard";

const ProgressionMovements = (props) => {
  const { progressionMovements } = props;
  return (
    <div>
      <div className="mb-2.5">
        <h5 className="md:text-[20px] text-[24px] text-black font-semibold tracking-[-0.1px] md:tracking-[-0.18px] leading-[28px] md:leading-[26px]">
          Progression Movements
        </h5>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:max-lg:grid-cols-2 gap-4 md:gap-3 h-fit">
        {progressionMovements.map((movement, index) => (
          <LibraryCard key={index} {...{ movement }} />
        ))}
      </div>
    </div>
  );
};

export default ProgressionMovements;
