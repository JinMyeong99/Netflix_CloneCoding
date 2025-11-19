export const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const BaseUrl = "https://api.themoviedb.org/3";
export const BaseImageUrl = "https://image.tmdb.org/t/p/original";

export const ImageUrl = (path) => {
  if (!path) return "";
  return `${BaseImageUrl}${path}`;
};
