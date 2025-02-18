import { useBoundStore } from "../store/useBoundStore";

export const Fish = () => {
  return (
    <div>
      <p>Fish</p>
      <FishCounter />
    </div>
  );
};

export const FishCounter = () => {
    const fishes = useBoundStore(state => state.fishes)
    return (
        <p>Amount of fish: {fishes}</p> 
    )
} 

