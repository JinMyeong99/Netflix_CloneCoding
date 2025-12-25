import { useQuery } from "@tanstack/react-query";
import { fetchHeroData } from "../../api/tmdb/fetchHeroData";

export default function useHeroQuery() {
  return useQuery({
    queryKey: ["hero"],
    queryFn: fetchHeroData,
    staleTime: 1000 * 60 * 5,
  });
}
