export const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const BaseUrl = "https://api.themoviedb.org/3";
export const BaseImageUrl = "https://image.tmdb.org/t/p";

export const ImageUrl = (path, size) =>
  !path ? "" : `${BaseImageUrl}/${size}${path}`;

export const posterSrcSet = (path) => {
  if (!path) return "";
  return [
    `${ImageUrl(path, "w185")} 185w`,
    `${ImageUrl(path, "w342")} 342w`,
  ].join(", ");
};

export const backdropSrcSet = (path) => {
  if (!path) return "";
  return [
    `${ImageUrl(path, "w300")} 300w`,  
    `${ImageUrl(path, "w780")} 780w`,  
    `${ImageUrl(path, "w1280")} 1280w` 
  ].join(", ");
};