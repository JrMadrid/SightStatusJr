/* FUNCIÓN DE NOMBRAR PAGINAS */
import { useEffect } from "react";

export default function usePageTitle(title, defaultTitle = "StatusAppJR") {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};