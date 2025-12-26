import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import ContentGrid from "../components/ContentGrid";
import useFavorite from "../hooks/useFavorite";

export default function Favorite() {
  const { favoriteList: favorite } = useFavorite();

  const {
    openDetail,
    toggleFavorite,
    openTrailer,
  } = useContentDetail();

  const favoritesWithGenre = useGenreName(favorite, "auto");

  if (!favorite || favorite.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>아직 찜한 콘텐츠가 없어요.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-16 pb-10 px-[5%]">
        <h1 className="text-2xl md:text-3xl my-5">내가 찜한 콘텐츠</h1>
        <ContentGrid
          contents={favoritesWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
      </div>
    </div>
  );
}
