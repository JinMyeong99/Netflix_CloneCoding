import { useSelector } from "react-redux";
import useContentDetail from "../hooks/useContentDetail";
import ContentCard from "../components/ContentCard";
import useHoverActive from "../hooks/useHoverActive";
import ContentDetailModal from "../components/ContentDetailModal";
import useGenreName from "../hooks/useGenreName";

export default function Favorite() {
  const favorite = useSelector((state) => state.favorite.list);

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    playTrailer,
  } = useContentDetail();

  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();

  const favoritesWithGenre = useGenreName(favorite, "auto");

  if (!favorite || favorite.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-30">
        <p>아직 찜한 콘텐츠가 없어요.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-16 pb-10 px-[5%]">
        <h1 className="text-2xl mb-4">내가 찜한 콘텐츠</h1>
        <div className="flex flex-wrap gap-x-[7.5px] gap-y-20">
          {favoritesWithGenre.map((favContent) => (
            <div
              key={favContent.id}
              onMouseEnter={() => handleMouseEnter(favContent.id)}
              onMouseLeave={() => handleMouseLeave(favContent.id)}
            >
              <ContentCard
                content={favContent}
                openHover={hoverContentId === favContent.id}
                openDetail={() => openDetail(favContent)}
                toggleFavorite={toggleFavorite}
                onPlayTrailer={playTrailer}
              />
            </div>
          ))}
        </div>
      </div>

      {showDetail && selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={closeDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
      )}
    </div>
  );
}
