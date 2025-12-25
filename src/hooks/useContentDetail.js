import { useCallback, useEffect, useState } from "react";
import useFavoriteStore from "../store/useFavoriteStore";
import toast from "react-hot-toast";
import { getTrailerUrl } from "../api/attachTrailer";

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

  const openTrailer = useCallback(async (content, mode = "auto") => {
    if (!content) return;

    if (content.trailerUrl) {
      window.open(content.trailerUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const toastId = toast.loading("", {
      id: "trailer-loading",
      duration: 8000,
      style: { display: "none" },
    });

    try {
      const trailerUrl = await getTrailerUrl(content, mode);
      toast.dismiss(toastId);

      if (!trailerUrl) {
        toast("영상이 없는 콘텐츠입니다.", {
          id: "no-trailer",
          icon: "⚠️",
          duration: 2200,
        });
        return;
      }

      window.open(trailerUrl, "_blank", "noopener,noreferrer");
    } catch {
      toast.dismiss(toastId);
      toast("영상 로딩에 실패했습니다.", {
        id: "trailer-error",
        icon: "⚠️",
        duration: 2200,
      });
    }
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
    openTrailer,
  };
}
