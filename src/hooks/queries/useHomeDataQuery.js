import { useQuery } from "@tanstack/react-query";
import { fetchHomeData } from "../../api/tmdb/fetchHomeData";

export default function useHomeDataQuery() {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
    staleTime: 1000 * 60 * 5,
  });
}
