import { useCallback } from "react";
import toast from "react-hot-toast";
import { getTrailerUrl } from "../api/attachTrailer";
import useFavoriteStore from "../store/useFavoriteStore";
import useContentDetailStore from "../store/useContentDetailStore";

export default function useContentDetail() {
  const openDetail = useContentDetailStore((state) => state.open);
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

  return {
    openDetail,
    toggleFavorite,
    openTrailer,
  };
}
