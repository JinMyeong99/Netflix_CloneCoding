import { useQuery } from "@tanstack/react-query";
import { fetchTrendingData } from "../../api/tmdb/fetchTrendingData";

export default function useTrendingQuery() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingData,
    staleTime: 1000 * 60 * 5,
  });
}
