import { memo } from "react";

import { useBoundStore } from "../store/useBoundStore";

export const Bear = () => {
  return (
    <div>
      <BearCounter />
      <BearControls />
    </div>
  );
};

const BearCounter = () => {
  const bears = useBoundStore((state) => state.bears);
  const hunger = useBoundStore((state) => state.hunger);
  return (
    <div>
      <p>Number of bears: {bears} </p>
      <p>Hunger: {hunger} </p>
    </div>
  );
};

// For this simple example, we do not need to optimize that
// but just for example purpose as how to optimize
const BearControls = memo(() => {
  const { increasePopulation, removeAllBears, eatFish } = useBoundStore(
    (state) => state,
  );

  // Since there is no props in component i do not need to wrap it in useCallback
  const handleOnClick = () => {
    increasePopulation(1);
  };
  return (
    <>
      <button onClick={handleOnClick}>Increase</button>
      <button onClick={removeAllBears}>Reset</button>
      <button onClick={eatFish}>Eat</button>
    </>
  );
});
