export const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const BaseUrl = "https://api.themoviedb.org/3";
export const BaseImageUrl = "https://image.tmdb.org/t/p";

export const ImageUrl = (path, size) =>
  !path ? "" : `${BaseImageUrl}/${size}${path}`;
