import { useCallback, useEffect, useState } from "react";
import useFavoriteStore from "../store/useFavoriteStore";
import toast from "react-hot-toast";

export default function useContentDetail() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const openDetail = useCallback((content) => {
    setSelectedContent(content);
    setShowDetail(true);
  }, []);

  const closeDetail = useCallback(() => {
    setShowDetail(false);
    setSelectedContent(null);
  }, []);

  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const playTrailer = useCallback((content) => {
    if (!content?.trailerUrl) {
      toast("영상이 없는 콘텐츠입니다.", {
        id: "no-trailer",
        icon: "⚠️",
        duration: 2200,
      });
      return;
    }

    window.open(content.trailerUrl, "_blank", "noopener,noreferrer");
  }, []);

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
