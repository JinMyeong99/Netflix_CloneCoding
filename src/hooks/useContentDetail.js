import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { favoriteSlice } from "../RTK/favoriteSlice";

export default function useContentDetail() {
  const dispatch = useDispatch();

  const [selectedContent, setSelectedContent] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const openDetail = (content) => {
    setSelectedContent(content);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedContent(null);
  };

  const toggleFavorite = (content) => {
    dispatch(favoriteSlice.actions.toggleFavorite(content));
  };

  const playTrailer = (content) => {
    if (!content?.trailerUrl) return;
    window.open(content.trailerUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (showDetail) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [showDetail]);

  return {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    playTrailer,
  };
}
