import React from "react";

function HidePreloader(props: React.PropsWithChildren) {
  React.useEffect(() => {
    const preloaderContainer = document.getElementById("preloader-container");
    if (preloaderContainer) {
      setTimeout(() => {
        preloaderContainer.style.opacity = "0";
        preloaderContainer.style.visibility = "hidden";
      }, 600);
    }
  }, []);

  return <>{props.children}</>;
}

export default HidePreloader;
