import { useQuery } from "@tanstack/react-query";
import { genreData } from "../../data/genres";

export default function useGenresQuery() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => genreData,
    initialData: genreData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
