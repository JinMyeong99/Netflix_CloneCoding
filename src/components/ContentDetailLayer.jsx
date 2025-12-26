import { useEffect } from "react";
import { createPortal } from "react-dom";
import ContentDetailModal from "./ContentDetailModal";
import useContentDetailStore from "../store/useContentDetailStore";
import useContentDetail from "../hooks/useContentDetail";

export default function ContentDetailLayer() {
  const content = useContentDetailStore((state) => state.content);
  const isOpen = useContentDetailStore((state) => state.isOpen);
  const closeDetail = useContentDetailStore((state) => state.close);
  const { openTrailer, toggleFavorite } = useContentDetail();

  useEffect(() => {
    if (!isOpen) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen || !content) return null;

  return createPortal(
    <ContentDetailModal
      content={content}
      closeDetail={closeDetail}
      toggleFavorite={toggleFavorite}
      openTrailer={openTrailer}
    />,
    document.body
  );
}
