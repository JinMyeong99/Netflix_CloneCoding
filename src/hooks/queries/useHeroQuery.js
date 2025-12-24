import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiKey, BaseUrl } from "../../api/tmdb";

async function fetchHeroContent() {
  const params = new URLSearchParams({
    api_key: ApiKey,
    language: "ko-KR",
    include_adult: "false",
    with_origin_country: "KR|US|JP|GB",
    sort_by: "popularity.desc",
    page: "1",
  }).toString();

  const url = `${BaseUrl}/discover/movie?${params}`;
  const { data } = await axios.get(url);
  const [first] = data?.results ?? [];
  return first || null;
}

export default function useHeroQuery() {
  return useQuery({
    queryKey: ["hero"],
    queryFn: fetchHeroContent,
    staleTime: 1000 * 60 * 5,
  });
}
