export const getCharacterInfo = async (id: number) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
