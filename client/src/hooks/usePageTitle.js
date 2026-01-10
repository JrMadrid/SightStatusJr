/* HOOK PARA FUNCIÓN DE NOMBRAR PAGINAS */
import { useEffect } from "react";

export default function usePageTitle(title, defaultTitle = "CoreSightJr") {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};