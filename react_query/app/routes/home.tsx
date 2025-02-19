import type { Route } from "./+types/home";

import { getCharacterInfo } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const RickAndMortyCharacter = ({ id }: { id: number }) => {
  // include id as a query key as they describe the data
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterInfo(id),
  });

  return (
    <span>
      {isPending ? "Loading..." : isError ? error.message : data.name}
    </span>
  );
};

export default function Home() {
  return (
    <div>
      <p>Rick And Morty API</p>
      <RickAndMortyCharacter id={1} />
    </div>
  );
}
