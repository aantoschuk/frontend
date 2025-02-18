import { memo } from "react";

import { useStore } from "../hook/useStore";

export const Bear = () => {
  return (
    <div>
      <BearCounter />
      <BearControls />
    </div>
  );
};

const BearCounter = () => {
  const bears = useStore((state) => state.bears);
  return <p>Number of bears: {bears} </p>;
};

// For this simple example, we do not need to optimize that 
// but just for example purpose as how to optimize 
const BearControls = memo(() => {
  const { increasePopulation, removeAllBears } = useStore((state) => state);

  // Since there is no props in component i do not need to wrap it in useCallback
  const handleOnClick = () => {
    increasePopulation(1);
  };
  return (
    <>
      <button onClick={handleOnClick}>Increase</button>
      <button onClick={removeAllBears}>Reset</button>
    </>
  );
});
